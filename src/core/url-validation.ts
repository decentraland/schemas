/**
 * Configuration for URL validation
 * @public
 */
export interface UrlValidationConfig {
  /** Whether to allow localhost and private IPs (useful for development) */
  allowLocalhost?: boolean
  /** Additional ports to allow beyond the default 80, 443 */
  allowedPorts?: string[]
}

/**
 * Default configuration for URL validation
 */
const DEFAULT_CONFIG: Required<UrlValidationConfig> = {
  allowLocalhost: false,
  allowedPorts: []
}

/**
 * Normalize and decode URL string defensively
 */
function decodeAndNormalize(s: string, times = 2): string {
  let out = s
  for (let i = 0; i < times; i++) {
    try {
      out = decodeURIComponent(out)
    } catch {
      break
    }
  }
  return out.normalize('NFKC')
}

/**
 * Check for control characters or bidirectional text
 *
 * Control characters (0x00-0x1F, 0x7F-0x9F) and bidirectional text controls
 * can be used to:
 * - Hide malicious content in URLs (e.g., null bytes to terminate strings)
 * - Create visual confusion attacks (bidirectional text can reverse display order)
 * - Bypass security filters that don't handle these characters properly
 *
 * Example XSS vector: "https://example.com/path\u202Eevil.com"
 * The RLO (Right-to-Left Override) character can make "evil.com" appear before "path"
 */
function hasControlOrBidi(s: string): boolean {
  return /[\u0000-\u001F\u007F-\u009F\u202A-\u202E\u2066-\u2069]/.test(s)
}

/**
 * Check if URL has credentials
 */
function hasCredentials(u: URL): boolean {
  return Boolean(u.username || u.password)
}

/**
 * Check for backslashes
 *
 * Backslashes can be used to:
 * - Escape characters in contexts where they're interpreted (e.g., Windows paths)
 * - Create paths that bypass validation (e.g., "C:\Windows\System32" vs "/Windows/System32")
 * - Inject code in parsers that don't properly handle backslash escaping
 *
 * Example: "https://example.com/path\\..\\..\\etc\\passwd" could be interpreted
 * as a directory traversal attack on Windows systems
 */
function hasBackslash(s: string): boolean {
  return /\\/.test(s)
}

/**
 * Default allowed ports for URL validation (SSRF protection)
 * Standard HTTP/HTTPS ports (80, 443)
 */
const DEFAULT_ALLOWED_PORTS = ['80', '443']

/**
 * Check if port is disallowed (SSRF protection)
 * Only allows ports defined in the allowed ports list
 */
function isDisallowedPort(u: URL, allowedPorts: string[]): boolean {
  return !!u.port && !allowedPorts.includes(u.port)
}

/**
 * Check if hostname is private/local
 * Note: If implementing domain whitelists, convert hostname to ASCII (punycode)
 * before comparison to avoid homograph attacks
 */
function isPrivateHost(hostname: string): boolean {
  const normalized = hostname.toLowerCase()

  // Check for localhost variants
  if (normalized === 'localhost' || normalized.endsWith('.local')) {
    return true
  }

  // Check for private IP ranges (basic regex check)
  if (/^(127\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.)/.test(normalized)) {
    return true
  }

  // Check for IPv6 localhost
  if (
    normalized === '::1' ||
    normalized === '[::1]' ||
    normalized.startsWith('fe80:') ||
    normalized.startsWith('fc00:')
  ) {
    return true
  }

  return false
}

/**
 * Safely parse URL supporting both absolute and relative URLs
 */
function safeParseUrl(urlString: string): { url: URL; wasRelative: boolean } | null {
  // Block protocol-relative URLs (//host) for security
  if (urlString.startsWith('//')) {
    return null
  }

  try {
    // Try parsing as absolute URL first
    return { url: new URL(urlString), wasRelative: false }
  } catch {
    try {
      // If it fails, try as relative URL with a safe base
      return { url: new URL(urlString, 'https://example.com'), wasRelative: true }
    } catch {
      return null
    }
  }
}

/**
 * Validates if a string contains potentially malicious content
 */
function isSafeString(value: string): boolean {
  const normalized = decodeAndNormalize(String(value).toLowerCase())

  // Check for control characters and backslashes
  if (hasControlOrBidi(normalized) || hasBackslash(normalized)) {
    return false
  }

  return true
}

/**
 * Validates if a URL path is safe
 */
function isSafePath(path: string): boolean {
  if (!path) {
    return false
  }

  // Prevent directory traversal attacks
  // Note: Blocking // in paths is strict policy - if legitimate paths could have collapsed //,
  // consider normalizing /{2,}→/ instead of rejecting
  if (path.includes('..') || path.includes('//')) {
    return false
  }

  // Check for control characters and backslashes
  if (hasControlOrBidi(path) || hasBackslash(path)) {
    return false
  }

  return true
}

/**
 * Validates if a URL string is safe
 * @param url - The URL string to validate
 * @param config - Validation configuration
 * @returns true if the URL is safe, false if it contains malicious content
 * @public
 */
export function validateUrl(url: string, config: UrlValidationConfig = {}): boolean {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  const allowedPorts = [...DEFAULT_ALLOWED_PORTS, ...mergedConfig.allowedPorts]

  // Check for null/undefined/empty
  if (!url || url.length === 0) {
    return false
  }

  // Check URL length limit (4KB)
  if (url.length > 4096) {
    return false
  }

  // Early check for control characters, bidirectional text, and backslashes in raw URL
  if (hasControlOrBidi(url) || hasBackslash(url)) {
    return false
  }

  // Early check on decoded URL to catch encoded escapes (%5C, %0a, etc.)
  const decoded = decodeAndNormalize(url)
  if (hasControlOrBidi(decoded) || hasBackslash(decoded)) {
    return false
  }

  // Block protocol-relative URLs (//host)
  if (url.startsWith('//')) {
    return false
  }

  const parsed = safeParseUrl(url)
  if (!parsed) {
    return false
  }

  const { url: urlObj, wasRelative } = parsed

  // Check protocol - only allow http, https, and relative protocols
  if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:' && urlObj.protocol !== '') {
    return false
  }

  // Check for credentials and backslashes
  if (hasCredentials(urlObj) || hasBackslash(url) || hasBackslash(urlObj.href)) {
    return false
  }

  // Only check host/port/SSRF for absolute URLs
  if (!wasRelative) {
    // Check for disallowed ports
    if (isDisallowedPort(urlObj, allowedPorts)) {
      return false
    }

    // Check for private hosts (SSRF protection) - configurable for development
    if (!mergedConfig.allowLocalhost && urlObj.hostname && isPrivateHost(urlObj.hostname)) {
      return false
    }
  }

  // Check path for directory traversal and malicious paths
  if (!isSafePath(urlObj.pathname)) {
    return false
  }

  // Check path length limit (2KB)
  if (urlObj.pathname.length > 2048) {
    return false
  }

  // Check search parameters for malicious content and limits
  const paramEntries = Array.from(urlObj.searchParams.entries())
  if (paramEntries.length > 50) {
    return false // Too many parameters
  }

  // Check total query string length (2KB limit)
  const queryLength = urlObj.search
    ? urlObj.search.startsWith('?')
      ? urlObj.search.length - 1
      : urlObj.search.length
    : 0
  if (queryLength > 2048) {
    return false
  }

  for (const [key, value] of paramEntries) {
    // Reject empty keys
    if (key.length === 0) {
      return false
    }

    if (!isSafeString(key) || !isSafeString(value)) {
      return false
    }

    // Check parameter size limits
    if (key.length > 128 || value.length > 1024) {
      return false
    }
  }

  // Check fragment for control characters
  if (urlObj.hash && hasControlOrBidi(urlObj.hash)) {
    return false
  }

  return true
}

/**
 * Validates if a URL instance is safe
 * @param url - The URL instance to validate
 * @param config - Validation configuration
 * @returns true if the URL is safe, false otherwise
 * @public
 */
export function validateUrlInstance(url: URL, config: UrlValidationConfig = {}): boolean {
  return validateUrl(url.toString(), config)
}
