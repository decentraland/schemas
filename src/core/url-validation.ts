import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { KeywordDefinition } from 'ajv'

/**
 * Interface for query parameters
 * @public
 */
export interface QueryParams {
  [key: string]: string | number | boolean | null | undefined
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
 */
function hasBackslash(s: string): boolean {
  return /\\/.test(s)
}

/**
 * Check if port is disallowed
 */
function isDisallowedPort(u: URL): boolean {
  return !!u.port && !['80', '443'].includes(u.port)
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
  if (normalized === '::1' || normalized.startsWith('fe80:') || normalized.startsWith('fc00:')) {
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
 * @param value - The string to validate
 * @returns true if the string is safe, false if it contains malicious content
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
 * @param path - The path to validate
 * @returns true if the path is safe, false if it contains malicious content
 */
function isSafePath(path: string): boolean {
  if (!path || typeof path !== 'string') {
    return false
  }

  // Prevent directory traversal attacks
  // Note: Blocking // in paths is strict policy - if legitimate paths could have collapsed //,
  // consider normalizing /{2,}→/ instead of rejecting
  if (path.includes('..') || path.includes('//')) {
    return false
  }

  // Prevent backslashes and control characters
  if (hasBackslash(path) || hasControlOrBidi(path)) {
    return false
  }

  return true
}

/**
 * Namespace with utilities to validate URLs safely
 * @public
 */
export namespace UrlValidation {
  /**
   * Custom validation to check if a URL is safe
   */
  export const _isSafeUrl: KeywordDefinition = {
    keyword: '_isSafeUrl',
    validate: function validate(schema: boolean, data: string) {
      if (!data || typeof data !== 'string') {
        return false
      }

      // Early check for control characters, bidirectional text, and backslashes in raw URL
      if (hasControlOrBidi(data) || hasBackslash(data)) {
        return false
      }

      const parsed = safeParseUrl(data)
      if (!parsed) {
        return false
      }

      const { url: urlObj, wasRelative } = parsed

      // Check protocol - only allow http, https, and relative protocols
      if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:' && urlObj.protocol !== '') {
        return false
      }

      // Check for credentials and backslashes
      if (hasCredentials(urlObj) || hasBackslash(data) || hasBackslash(urlObj.href)) {
        return false
      }

      // Only check host/port/SSRF for absolute URLs
      if (!wasRelative) {
        // Check for disallowed ports
        if (isDisallowedPort(urlObj)) {
          return false
        }

        // Check for private hosts (SSRF protection)
        // Note: This is static validation. Complete SSRF protection requires DNS resolution +
        // IP validation on the server before opening sockets
        if (urlObj.hostname && isPrivateHost(urlObj.hostname)) {
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
      const queryString = urlObj.search
      if (queryString && queryString.length > 2048) {
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
    },
    errors: false
  }

  export const schema = {
    type: 'string',
    format: 'uri-reference',
    _isSafeUrl: true
  } as JSONSchema<string>

  export const validate: ValidateFunction<string> = generateLazyValidator(schema, [_isSafeUrl])

  /**
   * Safely builds a URL with query parameters, automatically encoding all values
   * @param basePath - The base path without query parameters
   * @param params - Object containing query parameters
   * @returns A properly encoded URL string
   * @throws Error if malicious content is detected
   */
  export function buildUrlWithParams(basePath: string, params: QueryParams): string {
    // Try to parse as URL to preserve fragments and origin
    const parsed = safeParseUrl(basePath)
    let finalPath: string
    let hasFragment = false
    let isAbsolute = false

    if (parsed) {
      finalPath = parsed.url.pathname
      hasFragment = !!parsed.url.hash
      isAbsolute = !parsed.wasRelative
    } else {
      // Fallback to path validation
      if (!isSafePath(basePath)) {
        throw new Error('Invalid or potentially malicious base path detected')
      }
      finalPath = basePath
    }

    const queryParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const stringValue = String(value)

        // Validate key and value for malicious content
        if (!isSafeString(key)) {
          throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
        }

        if (!isSafeString(stringValue)) {
          throw new Error(`Invalid or potentially malicious parameter value detected: ${stringValue}`)
        }

        queryParams.set(key, stringValue)
      }
    })

    const queryString = queryParams.toString()
    let result = queryString ? `${finalPath}?${queryString}` : finalPath

    // Preserve fragment if it existed and validate it
    if (hasFragment && parsed) {
      const fragment = parsed.url.hash
      if (hasControlOrBidi(fragment)) {
        throw new Error('Invalid or potentially malicious fragment detected')
      }
      result = result + fragment
    }

    // Preserve origin for absolute URLs
    if (isAbsolute && parsed) {
      return parsed.url.origin + result
    }

    return result
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
    if (!isSafeString(key)) {
      throw new Error(`Invalid or potentially malicious parameter key detected: ${key}`)
    }

    if (!isSafeString(String(value))) {
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
    if (!isSafeString(key)) {
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
    if (!isSafeString(key)) {
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
   * @returns true if the URL is safe, false if it contains malicious content
   */
  export function isSafeUrl(url: string): boolean {
    // Check URL length limit (4KB)
    if (url.length > 4096) {
      return false
    }

    // Early check for control characters, bidirectional text, and backslashes in raw URL
    if (hasControlOrBidi(url) || hasBackslash(url)) {
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
      if (isDisallowedPort(urlObj)) {
        return false
      }

      // Check for private hosts (SSRF protection)
      // Note: This is static validation. Complete SSRF protection requires DNS resolution +
      // IP validation on the server before opening sockets
      if (urlObj.hostname && isPrivateHost(urlObj.hostname)) {
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
    const queryString = urlObj.search
    if (queryString && queryString.length > 2048) {
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
   * Validates if a URL is safe for redirection (similar to redirection hook validation)
   * @param url - The URL to validate for redirection
   * @returns true if the URL is safe for redirection, false otherwise
   */
  export function isSafeRedirectUrl(url: string): boolean {
    // Check URL length limit (4KB)
    if (url.length > 4096) {
      return false
    }

    // Early check for control characters, bidirectional text, and backslashes in raw URL
    if (hasControlOrBidi(url) || hasBackslash(url)) {
      return false
    }

    const parsed = safeParseUrl(url)
    if (!parsed) {
      return false
    }

    const { url: redirectToURL, wasRelative } = parsed

    // Check if the protocol is safe to prevent XSS attacks
    if (redirectToURL.protocol !== 'http:' && redirectToURL.protocol !== 'https:') {
      return false
    }

    // Check for credentials and backslashes
    if (hasCredentials(redirectToURL) || hasBackslash(url) || hasBackslash(redirectToURL.href)) {
      return false
    }

    // Only check host/port/SSRF for absolute URLs
    if (!wasRelative) {
      // Check for disallowed ports
      if (isDisallowedPort(redirectToURL)) {
        return false
      }

      // Check for private hosts (SSRF protection)
      // Note: This is static validation. Complete SSRF protection requires DNS resolution +
      // IP validation on the server before opening sockets
      if (redirectToURL.hostname && isPrivateHost(redirectToURL.hostname)) {
        return false
      }
    }

    // Additional path validation for redirection
    if (!isSafePath(redirectToURL.pathname)) {
      return false
    }

    // Check path length limit (2KB)
    if (redirectToURL.pathname.length > 2048) {
      return false
    }

    // Check fragment for control characters
    if (redirectToURL.hash && hasControlOrBidi(redirectToURL.hash)) {
      return false
    }

    return true
  }
}
