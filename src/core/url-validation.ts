/**
 * Interface for query parameters
 * @public
 */
export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined
}

/**
 * Configuration for URL validation
 * @public
 */
export interface UrlValidationConfig {
  /** Whether to allow localhost and private IPs (useful for development) */
  allowLocalhost?: boolean
  /** Additional ports to allow beyond the default 80, 443 */
  allowedPorts?: string[]
  /** Whether to allow relative URLs for redirection */
  allowRelativeRedirects?: boolean
}

/**
 * Default configuration for URL validation
 */
const DEFAULT_CONFIG: Required<UrlValidationConfig> = {
  allowLocalhost: false,
  allowedPorts: [],
  allowRelativeRedirects: false
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
 * Get the actual query string length (excluding the leading '?')
 * @param url - URL object to check
 * @returns Length of query string without the '?' prefix
 */
function queryLength(url: URL): number {
  if (!url.search) return 0
  return url.search.startsWith('?') ? url.search.length - 1 : url.search.length
}

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
 * Namespace with utilities to validate URLs safely
 * @public
 */
export namespace UrlValidation {
  /**
   * Validates if a string contains potentially malicious content
   */
  export function isSafeString(value: string): boolean {
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
  export function isSafePath(path: string): boolean {
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
   * Core URL validation logic - consolidated to avoid duplication
   * @param url - The URL to validate
   * @param config - Validation configuration
   * @returns true if the URL is safe, false otherwise
   */
  function validateUrlCore(url: string, config: UrlValidationConfig = {}): boolean {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config }
    const allowedPorts = [...DEFAULT_ALLOWED_PORTS, ...mergedConfig.allowedPorts]

    // Check for null/undefined/empty
    if (!url || typeof url !== 'string' || url.length === 0) {
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
    if (!UrlValidation.isSafePath(urlObj.pathname)) {
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
    if (queryLength(urlObj) > 2048) {
      return false
    }

    for (const [key, value] of paramEntries) {
      // Reject empty keys
      if (key.length === 0) {
        return false
      }

      if (!UrlValidation.isSafeString(key) || !UrlValidation.isSafeString(value)) {
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
   * Safely validates a URL instance
   * @param url - The URL instance to validate
   * @param config - Validation configuration
   * @returns true if the URL is safe, false otherwise
   */
  export function isSafeUrlInstance(url: URL, config: UrlValidationConfig = {}): boolean {
    return validateUrlCore(url.toString(), config)
  }

  /**
   * Safely adds a single query parameter to a URL
   * @param baseUrl - The base URL
   * @param key - The parameter key
   * @param value - The parameter value
   * @returns A properly encoded URL string
   * @throws Error if malicious content is detected
   */
  export function addQueryParam(baseUrl: string, key: string, value: string | number | boolean): string {
    // Validate inputs
    if (!key || key.length === 0) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    if (!UrlValidation.isSafeString(key)) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    if (!UrlValidation.isSafeString(String(value))) {
      throw new Error(`Invalid or potentially malicious parameter value detected: ${value}`)
    }

    const parsed = safeParseUrl(baseUrl)
    if (!parsed) {
      throw new Error(`Invalid base URL: ${baseUrl}`)
    }

    const { url, wasRelative } = parsed
    url.searchParams.set(key, String(value))

    // Preserve relative URLs as relative
    if (wasRelative) {
      return url.pathname + url.search + url.hash
    }

    return url.toString()
  }

  /**
   * Safely removes a query parameter from a URL
   * @param baseUrl - The base URL
   * @param key - The parameter key to remove
   * @returns A URL string without the specified parameter
   * @throws Error if malicious content is detected
   */
  export function removeQueryParam(baseUrl: string, key: string): string {
    // Validate key
    if (!key || key.length === 0) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    if (!UrlValidation.isSafeString(key)) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    const parsed = safeParseUrl(baseUrl)
    if (!parsed) {
      throw new Error(`Invalid base URL: ${baseUrl}`)
    }

    const { url, wasRelative } = parsed
    url.searchParams.delete(key)

    // Preserve relative URLs as relative
    if (wasRelative) {
      return url.pathname + url.search + url.hash
    }

    return url.toString()
  }

  /**
   * Safely gets a query parameter value from a URL
   * @param url - The URL to parse
   * @param key - The parameter key
   * @returns The decoded parameter value or null if not found
   * @throws Error if malicious content is detected
   */
  export function getQueryParam(url: string, key: string): string | null {
    // Validate key
    if (!key || key.length === 0) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    if (!UrlValidation.isSafeString(key)) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    const parsed = safeParseUrl(url)
    if (!parsed) {
      return null
    }

    return parsed.url.searchParams.get(key)
  }

  /**
   * Validates if a complete URL is safe
   * @param url - The URL to validate
   * @param config - Validation configuration
   * @returns true if the URL is safe, false if it contains malicious content
   */
  export function isSafeUrl(url: string, config: UrlValidationConfig = {}): boolean {
    return validateUrlCore(url, config)
  }

  /**
   * Validates if a URL is safe for redirection
   * @param url - The URL to validate for redirection
   * @param config - Validation configuration
   * @returns true if the URL is safe for redirection, false otherwise
   */
  export function isSafeRedirectUrl(url: string, config: UrlValidationConfig = {}): boolean {
    const mergedConfig = { ...DEFAULT_CONFIG, ...config }

    // Use core validation but with stricter protocol requirements for redirection
    const parsed = safeParseUrl(url)
    if (!parsed) {
      return false
    }

    const { url: urlObj, wasRelative } = parsed

    // For redirection, only allow HTTP/HTTPS protocols (no relative URLs unless configured)
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return false
    }

    // Reject relative URLs for redirection unless explicitly allowed
    if (wasRelative && !mergedConfig.allowRelativeRedirects) {
      return false
    }

    // Use core validation logic
    return validateUrlCore(url, config)
  }
}
