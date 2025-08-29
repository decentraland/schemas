import expect from 'expect'
import { UrlValidation } from '../../src/core/url-validation'

describe('when validating URLs for security', () => {
  describe('and checking if a URL is safe', () => {
    it('should return true for valid HTTP URLs', () => {
      const result = UrlValidation.isSafeUrl('http://example.com/path')
      expect(result).toBe(true)
    })

    it('should return true for valid HTTPS URLs', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/path')
      expect(result).toBe(true)
    })

    it('should return true for relative URLs', () => {
      const result = UrlValidation.isSafeUrl('/path/to/resource')
      expect(result).toBe(true)
    })

    it('should return false for JavaScript protocol URLs', () => {
      const result = UrlValidation.isSafeUrl('javascript:alert("xss")')
      expect(result).toBe(false)
    })

    it('should return false for data URI URLs', () => {
      const result = UrlValidation.isSafeUrl('data:text/html,<script>alert("xss")</script>')
      expect(result).toBe(false)
    })

    it('should return false for file protocol URLs', () => {
      const result = UrlValidation.isSafeUrl('file:///etc/passwd')
      expect(result).toBe(false)
    })

    it('should return false for URLs with directory traversal', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/../../../etc/passwd')
      expect(result).toBe(false)
    })

    it('should return false for URLs with double slashes', () => {
      const result = UrlValidation.isSafeUrl('https://example.com//path')
      expect(result).toBe(false)
    })
  })

  describe('and checking if a URL is safe for redirection', () => {
    it('should return true for safe redirect URLs', () => {
      const result = UrlValidation.isSafeRedirectUrl('https://example.com/safe-path')
      expect(result).toBe(true)
    })

    it('should return false for non-HTTP/HTTPS protocols', () => {
      const result = UrlValidation.isSafeRedirectUrl('ftp://example.com/path')
      expect(result).toBe(false)
    })

    it('should return false for URLs with malicious paths', () => {
      const result = UrlValidation.isSafeRedirectUrl('https://example.com/../../../etc/passwd')
      expect(result).toBe(false)
    })
  })

  describe('and building URLs with parameters', () => {
    it('should build a valid URL with query parameters', () => {
      const result = UrlValidation.buildUrlWithParams('/api/users', { id: 123, active: true })
      expect(result).toBe('/api/users?id=123&active=true')
    })

    it('should handle null and undefined parameters', () => {
      const result = UrlValidation.buildUrlWithParams('/api/users', { id: 123, active: null, status: undefined })
      expect(result).toBe('/api/users?id=123')
    })

    it('should throw error for malicious base path', () => {
      expect(() => {
        UrlValidation.buildUrlWithParams('../../../etc/passwd', {})
      }).toThrow('Invalid or potentially malicious base path detected')
    })

    it('should throw error for malicious parameter keys', () => {
      expect(() => {
        UrlValidation.buildUrlWithParams('/api/users', { 'javascript:alert("xss")': 'value' })
      }).toThrow('Invalid or potentially malicious parameter key detected')
    })

    it('should throw error for malicious parameter values', () => {
      expect(() => {
        UrlValidation.buildUrlWithParams('/api/users', { key: '<script>alert("xss")</script>' })
      }).toThrow('Invalid or potentially malicious parameter value detected')
    })
  })

  describe('and adding query parameters', () => {
    it('should add a query parameter to a URL', () => {
      const result = UrlValidation.addQueryParam('/api/users', 'id', 123)
      expect(result).toBe('/api/users?id=123')
    })

    it('should add a query parameter to an absolute URL', () => {
      const result = UrlValidation.addQueryParam('https://example.com/api/users', 'id', 123)
      expect(result).toBe('https://example.com/api/users?id=123')
    })

    it('should preserve hash when adding parameters', () => {
      const result = UrlValidation.addQueryParam('https://example.com/api/users#section', 'id', 123)
      expect(result).toBe('https://example.com/api/users?id=123#section')
    })

    it('should throw error for malicious parameter keys', () => {
      expect(() => {
        UrlValidation.addQueryParam('/api/users', 'javascript:alert("xss")', 'value')
      }).toThrow('Invalid or potentially malicious parameter key detected')
    })

    it('should throw error for malicious parameter values', () => {
      expect(() => {
        UrlValidation.addQueryParam('/api/users', 'key', '<script>alert("xss")</script>')
      }).toThrow('Invalid or potentially malicious parameter value detected')
    })
  })

  describe('and removing query parameters', () => {
    it('should remove a query parameter from a URL', () => {
      const result = UrlValidation.removeQueryParam('/api/users?id=123&active=true', 'id')
      expect(result).toBe('/api/users?active=true')
    })

    it('should throw error for malicious parameter keys', () => {
      expect(() => {
        UrlValidation.removeQueryParam('/api/users', 'javascript:alert("xss")')
      }).toThrow('Invalid or potentially malicious parameter key detected')
    })
  })

  describe('and getting query parameters', () => {
    it('should get a query parameter value from a URL', () => {
      const result = UrlValidation.getQueryParam('/api/users?id=123&active=true', 'id')
      expect(result).toBe('123')
    })

    it('should return null for non-existent parameter', () => {
      const result = UrlValidation.getQueryParam('/api/users?id=123', 'active')
      expect(result).toBe(null)
    })

    it('should throw error for malicious parameter keys', () => {
      expect(() => {
        UrlValidation.getQueryParam('/api/users', 'javascript:alert("xss")')
      }).toThrow('Invalid or potentially malicious parameter key detected')
    })
  })

  describe('and validating strings for security', () => {
    it('should return true for safe strings', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/safe-string-123')
      expect(result).toBe(true)
    })

    it('should return false for strings with HTML tags', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/path?param=<script>alert("xss")</script>')
      expect(result).toBe(false)
    })

    it('should return false for strings with JavaScript protocol', () => {
      const result = UrlValidation.isSafeUrl('javascript:alert("xss")')
      expect(result).toBe(false)
    })

    it('should return false for strings with SQL injection patterns', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/path?param=SELECT * FROM users')
      expect(result).toBe(false)
    })

    it('should return false for strings with XSS patterns', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/path?param=onclick=alert("xss")')
      expect(result).toBe(false)
    })
  })

  describe('and validating paths for security', () => {
    it('should return true for safe paths', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/api/users')
      expect(result).toBe(true)
    })

    it('should return false for paths with directory traversal', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/../../../etc/passwd')
      expect(result).toBe(false)
    })

    it('should return false for paths with double slashes', () => {
      const result = UrlValidation.isSafeUrl('https://example.com//api//users')
      expect(result).toBe(false)
    })

    it('should return false for system file paths', () => {
      const result = UrlValidation.isSafeUrl('https://example.com/etc/passwd')
      expect(result).toBe(false)
    })

    it('should return false for empty or invalid paths', () => {
      expect(UrlValidation.isSafeUrl('')).toBe(false)
      expect(UrlValidation.isSafeUrl(null as any)).toBe(false)
      expect(UrlValidation.isSafeUrl(undefined as any)).toBe(false)
    })
  })

  describe('and using the schema validator', () => {
    it('should validate safe URLs', () => {
      const result = UrlValidation.validate('https://example.com/path')
      expect(result).toBe(true)
    })

    it('should reject malicious URLs', () => {
      const result = UrlValidation.validate('javascript:alert("xss")')
      expect(result).toBe(false)
    })

    it('should reject invalid input types', () => {
      const result = UrlValidation.validate(null as any)
      expect(result).toBe(false)
    })
  })

  describe('and testing URL length limits', () => {
    it('should reject URLs longer than 4KB', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(4096)
      expect(UrlValidation.isSafeUrl(longUrl)).toBe(false)
    })

    it('should accept URLs within length limits', () => {
      const normalUrl = 'https://example.com/path'
      expect(UrlValidation.isSafeUrl(normalUrl)).toBe(true)
    })
  })

  describe('and testing SSRF protection', () => {
    it('should reject localhost URLs', () => {
      expect(UrlValidation.isSafeUrl('http://localhost/path')).toBe(false)
      expect(UrlValidation.isSafeUrl('https://127.0.0.1/path')).toBe(false)
    })

    it('should reject private IP ranges', () => {
      expect(UrlValidation.isSafeUrl('http://10.0.0.1/path')).toBe(false)
      expect(UrlValidation.isSafeUrl('http://192.168.1.1/path')).toBe(false)
      expect(UrlValidation.isSafeUrl('http://172.16.0.1/path')).toBe(false)
    })

    it('should reject .local domains', () => {
      expect(UrlValidation.isSafeUrl('http://internal.local/path')).toBe(false)
    })

    it('should accept public domains', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path')).toBe(true)
      expect(UrlValidation.isSafeUrl('https://google.com/path')).toBe(true)
    })
  })

  describe('and testing protocol restrictions', () => {
    it('should reject dangerous protocols', () => {
      expect(UrlValidation.isSafeUrl('javascript:alert("xss")')).toBe(false)
      expect(UrlValidation.isSafeUrl('data:text/html,<script>alert("xss")</script>')).toBe(false)
      expect(UrlValidation.isSafeUrl('file:///etc/passwd')).toBe(false)
    })

    it('should accept safe protocols', () => {
      expect(UrlValidation.isSafeUrl('http://example.com/path')).toBe(true)
      expect(UrlValidation.isSafeUrl('https://example.com/path')).toBe(true)
    })
  })

  describe('and testing port restrictions', () => {
    it('should reject disallowed ports', () => {
      expect(UrlValidation.isSafeUrl('https://example.com:22/path')).toBe(false)
      expect(UrlValidation.isSafeUrl('https://example.com:25/path')).toBe(false)
      expect(UrlValidation.isSafeUrl('https://example.com:3389/path')).toBe(false)
    })

    it('should accept allowed ports', () => {
      expect(UrlValidation.isSafeUrl('https://example.com:80/path')).toBe(true)
      expect(UrlValidation.isSafeUrl('https://example.com:443/path')).toBe(true)
    })

    it('should reject non-standard ports', () => {
      expect(UrlValidation.isSafeUrl('https://example.com:8080/path')).toBe(false)
      expect(UrlValidation.isSafeUrl('https://example.com:3000/path')).toBe(false)
    })
  })

  describe('and testing fragment validation', () => {
    it('should reject fragments with control characters', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path#\u0000')).toBe(false)
      expect(UrlValidation.isSafeUrl('https://example.com/path#\u202E')).toBe(false)
    })

    it('should accept safe fragments', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path#section')).toBe(true)
      expect(UrlValidation.isSafeUrl('https://example.com/path#hash-123')).toBe(true)
    })
  })

  describe('and testing relative URL support', () => {
    it('should accept relative URLs', () => {
      expect(UrlValidation.isSafeUrl('/path/to/resource')).toBe(true)
      expect(UrlValidation.isSafeUrl('relative/path')).toBe(true)
    })

    it('should reject protocol-relative URLs when not allowed', () => {
      expect(UrlValidation.isSafeUrl('//evil.com/path')).toBe(false)
    })
  })

  describe('and testing path length limits', () => {
    it('should reject paths longer than 2KB', () => {
      const longPath = 'https://example.com/' + 'a'.repeat(2048)
      expect(UrlValidation.isSafeUrl(longPath)).toBe(false)
    })

    it('should accept paths within length limits', () => {
      const normalPath = 'https://example.com/normal/path'
      expect(UrlValidation.isSafeUrl(normalPath)).toBe(true)
    })
  })

  describe('and testing query string length limits', () => {
    it('should reject query strings longer than 2KB', () => {
      const longQuery = 'https://example.com/path?' + 'a'.repeat(2048) + '=value'
      expect(UrlValidation.isSafeUrl(longQuery)).toBe(false)
    })

    it('should accept query strings within length limits', () => {
      const normalQuery = 'https://example.com/path?param=value&other=123'
      expect(UrlValidation.isSafeUrl(normalQuery)).toBe(true)
    })
  })

  describe('and testing empty parameter keys', () => {
    it('should reject URLs with empty parameter keys', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path?=value')).toBe(false)
    })

    it('should accept URLs with valid parameter keys', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path?key=value')).toBe(true)
    })
  })

  describe('and testing early backslash detection', () => {
    it('should reject URLs with backslashes early', () => {
      expect(UrlValidation.isSafeUrl('https:\\evil.com/path')).toBe(false)
    })

    it('should reject URLs with backslashes in path', () => {
      expect(UrlValidation.isSafeUrl('https://example.com\\path')).toBe(false)
    })
  })

  describe('and testing buildUrlWithParams origin preservation', () => {
    it('should preserve origin for absolute URLs', () => {
      const result = UrlValidation.buildUrlWithParams('https://example.com/path#hash', { id: 123 })
      expect(result).toBe('https://example.com/path?id=123#hash')
    })

    it('should not add origin for relative paths', () => {
      const result = UrlValidation.buildUrlWithParams('/path#hash', { id: 123 })
      expect(result).toBe('/path?id=123#hash')
    })
  })
})
