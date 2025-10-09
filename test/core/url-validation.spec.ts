import expect from 'expect'
import { UrlValidation, UrlValidationConfig } from '../../src/core/url-validation'

describe('when validating URLs for security', () => {
  describe('when checking if a URL is safe', () => {
    let input: string
    let result: boolean
    const act = () => {
      result = UrlValidation.isSafeUrl(input)
    }

    describe('and it is a valid HTTP URL', () => {
      beforeEach(() => {
        input = 'http://example.com/path'
        act()
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it is a valid HTTPS URL', () => {
      beforeEach(() => {
        input = 'https://example.com/path'
        act()
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it is a relative URL', () => {
      beforeEach(() => {
        input = '/path/to/resource'
        act()
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it uses the javascript protocol', () => {
      beforeEach(() => {
        input = 'javascript:alert("xss")'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it uses a data URI', () => {
      beforeEach(() => {
        input = 'data:text/html,<script>alert("xss")</script>'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it uses the file protocol', () => {
      beforeEach(() => {
        input = 'file:///etc/passwd'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it contains control characters', () => {
      beforeEach(() => {
        input = 'https://example.com/path\u0000'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and the path contains double slashes', () => {
      beforeEach(() => {
        input = 'https://example.com//path'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('when checking if a URL is safe for redirection', () => {
    let input: string
    let result: boolean
    const act = () => {
      result = UrlValidation.isSafeRedirectUrl(input)
    }

    describe('and it is an absolute https URL', () => {
      beforeEach(() => {
        input = 'https://example.com/safe-path'
        act()
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it uses a non-http/https protocol', () => {
      beforeEach(() => {
        input = 'ftp://example.com/path'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it contains control characters', () => {
      beforeEach(() => {
        input = 'https://example.com/path\u0000'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it is protocol-relative', () => {
      beforeEach(() => {
        input = '//evil.com/x'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it is relative (not absolute)', () => {
      beforeEach(() => {
        input = '/local/path'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('when using native URL constructor for building URLs', () => {
    it('should demonstrate safe URL construction with parameters', () => {
      // Using native URL constructor is recommended over custom builders
      const baseUrl = new URL('https://example.com/api/users')
      baseUrl.searchParams.set('id', '123')
      baseUrl.searchParams.set('active', 'true')

      expect(baseUrl.toString()).toBe('https://example.com/api/users?id=123&active=true')
      expect(UrlValidation.isSafeUrlInstance(baseUrl)).toBe(true)
    })

    it('should handle relative URLs safely', () => {
      const relativeUrl = new URL('/api/users?id=123', 'https://example.com')

      expect(relativeUrl.toString()).toBe('https://example.com/api/users?id=123')
      expect(UrlValidation.isSafeUrlInstance(relativeUrl)).toBe(true)
    })
  })

  describe('when adding query parameters', () => {
    let base: string
    let key: string
    let value: any
    let result: string

    describe('and the base is relative', () => {
      beforeEach(() => {
        base = '/api/users'
        key = 'id'
        value = 123
        result = UrlValidation.addQueryParam(base, key, value)
      })
      it('should return the path with the parameter', () => {
        expect(result).toBe('/api/users?id=123')
      })
    })

    describe('and the base is absolute', () => {
      beforeEach(() => {
        base = 'https://example.com/api/users'
        key = 'id'
        value = 123
        result = UrlValidation.addQueryParam(base, key, value)
      })
      it('should return the absolute URL with the parameter', () => {
        expect(result).toBe('https://example.com/api/users?id=123')
      })
    })

    describe('and the base has a hash', () => {
      beforeEach(() => {
        base = 'https://example.com/api/users#section'
        key = 'id'
        value = 123
        result = UrlValidation.addQueryParam(base, key, value)
      })
      it('should preserve the hash', () => {
        expect(result).toBe('https://example.com/api/users?id=123#section')
      })
    })

    describe('and the parameter key is empty', () => {
      beforeEach(() => {
        base = '/api/users'
        key = ''
        value = 'value'
      })
      it('should throw an error', () => {
        expect(() => UrlValidation.addQueryParam(base, key, value)).toThrow(
          'Invalid or potentially malicious parameter key detected'
        )
      })
    })

    describe('and the parameter value is malicious', () => {
      beforeEach(() => {
        base = '/api/users'
        key = 'key'
        value = 'value\u0000'
      })
      it('should throw an error', () => {
        expect(() => UrlValidation.addQueryParam(base, key, value)).toThrow(
          'Invalid or potentially malicious parameter value detected'
        )
      })
    })
  })

  describe('when removing query parameters', () => {
    let base: string
    let key: string
    let result: string

    describe('and the parameter exists', () => {
      beforeEach(() => {
        base = '/api/users?id=123&active=true'
        key = 'id'
        result = UrlValidation.removeQueryParam(base, key)
      })
      it('should remove only the specified parameter', () => {
        expect(result).toBe('/api/users?active=true')
      })
    })

    describe('and the key is empty', () => {
      beforeEach(() => {
        base = '/api/users'
        key = ''
      })
      it('should throw an error', () => {
        expect(() => UrlValidation.removeQueryParam(base, key)).toThrow(
          'Invalid or potentially malicious parameter key detected'
        )
      })
    })
  })

  describe('when getting query parameters', () => {
    let url: string
    let key: string
    let result: string | null

    describe('and the parameter exists', () => {
      beforeEach(() => {
        url = '/api/users?id=123&active=true'
        key = 'id'
        result = UrlValidation.getQueryParam(url, key)
      })
      it('should return the value', () => {
        expect(result).toBe('123')
      })
    })

    describe('and the parameter does not exist', () => {
      beforeEach(() => {
        url = '/api/users?id=123'
        key = 'active'
        result = UrlValidation.getQueryParam(url, key)
      })
      it('should return null', () => {
        expect(result).toBe(null)
      })
    })

    describe('and the key is empty', () => {
      beforeEach(() => {
        url = '/api/users'
        key = ''
      })
      it('should throw an error', () => {
        expect(() => UrlValidation.getQueryParam(url, key)).toThrow(
          'Invalid or potentially malicious parameter key detected'
        )
      })
    })
  })

  describe('when validating general string and path conditions', () => {
    let input: string
    let result: boolean
    const act = () => {
      result = UrlValidation.isSafeUrl(input)
    }

    describe('and the path is safe', () => {
      beforeEach(() => {
        input = 'https://example.com/api/users'
        act()
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and the path has control characters', () => {
      beforeEach(() => {
        input = 'https://example.com/path\u0000'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and the path has double slashes', () => {
      beforeEach(() => {
        input = 'https://example.com//api//users'
        act()
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and the input is empty or invalid', () => {
      it('should return false for empty string', () => {
        expect(UrlValidation.isSafeUrl('')).toBe(false)
      })
      // Nota: estos dos casos usan "as any" y mantienen 1 expect por it
      it('should return false for null input', () => {
        expect(UrlValidation.isSafeUrl(null as any)).toBe(false)
      })
      it('should return false for undefined input', () => {
        expect(UrlValidation.isSafeUrl(undefined as any)).toBe(false)
      })
    })
  })

  describe('when validating URL instances', () => {
    let url: URL
    let result: boolean
    const act = () => {
      result = UrlValidation.isSafeUrlInstance(url)
    }

    describe('and the URL is safe', () => {
      beforeEach(() => {
        url = new URL('https://example.com/path')
        act()
      })
      it('should validate successfully', () => {
        expect(result).toBe(true)
      })
    })

    describe('and the URL is malicious', () => {
      beforeEach(() => {
        url = new URL('javascript:alert("xss")')
        act()
      })
      it('should reject the input', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('when checking URL length limits', () => {
    it('should reject URLs longer than 4KB', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(4096)
      expect(UrlValidation.isSafeUrl(longUrl)).toBe(false)
    })

    it('should accept URLs within length limits', () => {
      const normalUrl = 'https://example.com/path'
      expect(UrlValidation.isSafeUrl(normalUrl)).toBe(true)
    })
  })

  describe('when applying SSRF protection', () => {
    describe('and localhost is not allowed (default)', () => {
      it('should reject localhost URLs', () => {
        expect(UrlValidation.isSafeUrl('http://localhost/path')).toBe(false)
      })

      it('should reject loopback IP URLs', () => {
        expect(UrlValidation.isSafeUrl('https://127.0.0.1/path')).toBe(false)
      })

      it('should reject private IP ranges', () => {
        expect(UrlValidation.isSafeUrl('http://10.0.0.1/path')).toBe(false)
      })

      it('should reject 192.168.x.x range', () => {
        expect(UrlValidation.isSafeUrl('http://192.168.1.1/path')).toBe(false)
      })

      it('should reject 172.16.x.x range', () => {
        expect(UrlValidation.isSafeUrl('http://172.16.0.1/path')).toBe(false)
      })

      it('should reject .local domains', () => {
        expect(UrlValidation.isSafeUrl('http://internal.local/path')).toBe(false)
      })

      it('should accept public domains', () => {
        expect(UrlValidation.isSafeUrl('https://example.com/path')).toBe(true)
      })
    })

    describe('and localhost is allowed for development', () => {
      const devConfig: UrlValidationConfig = { allowLocalhost: true }

      it('should accept localhost URLs', () => {
        expect(UrlValidation.isSafeUrl('http://localhost/path', devConfig)).toBe(true)
      })

      it('should accept loopback IP URLs', () => {
        expect(UrlValidation.isSafeUrl('https://127.0.0.1/path', devConfig)).toBe(true)
      })

      it('should accept private IP ranges', () => {
        expect(UrlValidation.isSafeUrl('http://10.0.0.1/path', devConfig)).toBe(true)
      })

      it('should accept 192.168.x.x range', () => {
        expect(UrlValidation.isSafeUrl('http://192.168.1.1/path', devConfig)).toBe(true)
      })

      it('should accept .local domains', () => {
        expect(UrlValidation.isSafeUrl('http://internal.local/path', devConfig)).toBe(true)
      })
    })
  })

  describe('when enforcing protocol restrictions', () => {
    it('should reject javascript protocol', () => {
      expect(UrlValidation.isSafeUrl('javascript:alert("xss")')).toBe(false)
    })

    it('should reject data protocol', () => {
      expect(UrlValidation.isSafeUrl('data:text/html,<script>alert("xss")</script>')).toBe(false)
    })

    it('should reject file protocol', () => {
      expect(UrlValidation.isSafeUrl('file:///etc/passwd')).toBe(false)
    })

    it('should accept http protocol', () => {
      expect(UrlValidation.isSafeUrl('http://example.com/path')).toBe(true)
    })

    it('should accept https protocol', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path')).toBe(true)
    })
  })

  describe('when enforcing port restrictions', () => {
    describe('and using default allowed ports', () => {
      it('should reject disallowed port 22', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:22/path')).toBe(false)
      })

      it('should reject disallowed port 25', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:25/path')).toBe(false)
      })

      it('should reject disallowed port 3389', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:3389/path')).toBe(false)
      })

      it('should accept allowed port 80', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:80/path')).toBe(true)
      })

      it('should accept allowed port 443', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:443/path')).toBe(true)
      })

      it('should reject non-standard port 8080', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:8080/path')).toBe(false)
      })

      it('should reject non-standard port 3000', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:3000/path')).toBe(false)
      })
    })

    describe('and using custom allowed ports for development', () => {
      const devConfig: UrlValidationConfig = { allowedPorts: ['3000', '8080'] }

      it('should accept development port 3000', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:3000/path', devConfig)).toBe(true)
      })

      it('should accept development port 8080', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:8080/path', devConfig)).toBe(true)
      })

      it('should still reject non-development ports', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:22/path', devConfig)).toBe(false)
      })

      it('should still accept default ports', () => {
        expect(UrlValidation.isSafeUrl('https://example.com:80/path', devConfig)).toBe(true)
      })
    })
  })

  describe('when testing redirection URL validation', () => {
    describe('and relative redirects are not allowed (default)', () => {
      it('should reject relative URLs for redirection', () => {
        expect(UrlValidation.isSafeRedirectUrl('/local/path')).toBe(false)
      })

      it('should accept absolute HTTPS URLs for redirection', () => {
        expect(UrlValidation.isSafeRedirectUrl('https://example.com/safe-path')).toBe(true)
      })

      it('should accept absolute HTTP URLs for redirection', () => {
        expect(UrlValidation.isSafeRedirectUrl('http://example.com/safe-path')).toBe(true)
      })
    })

    describe('and relative redirects are allowed', () => {
      const config: UrlValidationConfig = { allowRelativeRedirects: true }

      it('should accept relative URLs for redirection', () => {
        expect(UrlValidation.isSafeRedirectUrl('/local/path', config)).toBe(true)
      })

      it('should still accept absolute URLs for redirection', () => {
        expect(UrlValidation.isSafeRedirectUrl('https://example.com/safe-path', config)).toBe(true)
      })
    })
  })

  describe('when validating fragments', () => {
    it('should reject fragments with null char', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path#\u0000')).toBe(false)
    })

    it('should reject fragments with bidi control', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path#\u202E')).toBe(false)
    })

    it('should accept safe fragments', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path#section')).toBe(true)
    })

    it('should reject fragments with bidirectional text', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path#\u202Eevil')).toBe(false)
    })
  })

  describe('when validating relative URLs and decoding edge cases', () => {
    it('should accept relative path', () => {
      expect(UrlValidation.isSafeUrl('/path/to/resource')).toBe(true)
    })

    it('should reject protocol-relative URL', () => {
      expect(UrlValidation.isSafeUrl('//evil.com/path')).toBe(false)
    })

    it('should reject encoded backslash after decode', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path%5C')).toBe(false)
    })

    it('should reject encoded control char after decode', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path%0a')).toBe(false)
    })

    it('should reject IPv6 localhost literal', () => {
      expect(UrlValidation.isSafeUrl('http://[::1]/path')).toBe(false)
    })

    it('should reject double slashes in relative path', () => {
      expect(UrlValidation.isSafeUrl('/a//b')).toBe(false)
    })

    it('should reject path traversal with double dots', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/..../etc/passwd')).toBe(false)
    })

    it('should reject embedded credentials in URL', () => {
      expect(UrlValidation.isSafeUrl('https://user:pass@example.com/path')).toBe(false)
    })

    it('should reject Unicode control characters after normalization', () => {
      // Test that NFKC normalization doesn't escape control characters
      // Using combining characters that normalize to control chars
      const combiningControl = '\u0300\u0000' // Combining grave + null char
      expect(UrlValidation.isSafeUrl(`https://example.com/path${combiningControl}`)).toBe(false)
    })

    it('should reject Unicode bidirectional text after normalization', () => {
      // Test that NFKC normalization doesn't escape bidi characters
      const bidiText = '\u202E\u0065\u0076\u0069\u006C' // RLO + "evil"
      expect(UrlValidation.isSafeUrl(`https://example.com/path${bidiText}`)).toBe(false)
    })
  })

  describe('when enforcing path and query length limits', () => {
    it('should reject path longer than 2KB', () => {
      const longPath = 'https://example.com/' + 'a'.repeat(2048)
      expect(UrlValidation.isSafeUrl(longPath)).toBe(false)
    })

    it('should accept path within length limits', () => {
      const normalPath = 'https://example.com/normal/path'
      expect(UrlValidation.isSafeUrl(normalPath)).toBe(true)
    })

    it('should reject query longer than 2KB', () => {
      const longQuery = 'https://example.com/path?' + 'a'.repeat(2048) + '=value'
      expect(UrlValidation.isSafeUrl(longQuery)).toBe(false)
    })

    describe('and the query string length is exactly the limit', () => {
      let qs: string
      beforeEach(() => {
        qs = 'k1=' + 'v'.repeat(1024) + '&k2=' + 'v'.repeat(1017) // 2048
      })
      it('should accept the URL', () => {
        expect(UrlValidation.isSafeUrl(`https://example.com/path?${qs}`)).toBe(true)
      })
    })

    describe('and the query string length exceeds the limit by one', () => {
      let qs: string
      beforeEach(() => {
        qs = 'k1=' + 'v'.repeat(1024) + '&k2=' + 'v'.repeat(1018) // 2049
      })
      it('should reject the URL', () => {
        expect(UrlValidation.isSafeUrl(`https://example.com/path?${qs}`)).toBe(false)
      })
    })
  })

  describe('when validating parameter counts and sizes', () => {
    it('should accept exactly 50 query parameters', () => {
      const params = new Array(50)
        .fill(0)
        .map((_, i) => `k${i}=v`)
        .join('&')
      expect(UrlValidation.isSafeUrl(`https://example.com/path?${params}`)).toBe(true)
    })

    it('should reject 51 query parameters', () => {
      const params = new Array(51)
        .fill(0)
        .map((_, i) => `k${i}=v`)
        .join('&')
      expect(UrlValidation.isSafeUrl(`https://example.com/path?${params}`)).toBe(false)
    })

    it('should accept exactly 128 character key', () => {
      const exactKey = 'k'.repeat(128)
      expect(UrlValidation.isSafeUrl(`https://example.com/p?${exactKey}=v`)).toBe(true)
    })

    it('should reject 129 character key', () => {
      const oversizeKey = 'k'.repeat(129)
      expect(UrlValidation.isSafeUrl(`https://example.com/p?${oversizeKey}=v`)).toBe(false)
    })

    it('should accept exactly 1024 character value', () => {
      const exactValue = 'v'.repeat(1024)
      expect(UrlValidation.isSafeUrl(`https://example.com/p?k=${exactValue}`)).toBe(true)
    })

    it('should reject 1025 character value', () => {
      const oversizeValue = 'v'.repeat(1025)
      expect(UrlValidation.isSafeUrl(`https://example.com/p?k=${oversizeValue}`)).toBe(false)
    })

    it('should reject empty parameter key', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path?=value')).toBe(false)
    })

    it('should accept non-empty parameter key', () => {
      expect(UrlValidation.isSafeUrl('https://example.com/path?key=value')).toBe(true)
    })
  })
})
