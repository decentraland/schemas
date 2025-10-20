import expect from 'expect'
import { validateUrl, validateUrlInstance, UrlValidationConfig } from '../../src/core/url-validation'

describe('when validating URLs for security', () => {
  describe('when checking if a URL is safe', () => {
    let input: string
    let result: boolean

    describe('and it is a valid HTTP URL', () => {
      beforeEach(() => {
        input = 'http://example.com/path'
        result = validateUrl(input)
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it is a valid HTTPS URL', () => {
      beforeEach(() => {
        input = 'https://example.com/path'
        result = validateUrl(input)
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it is a relative URL', () => {
      beforeEach(() => {
        input = '/path/to/resource'
        result = validateUrl(input)
      })
      it('should return true', () => {
        expect(result).toBe(true)
      })
    })

    describe('and it uses the javascript protocol', () => {
      beforeEach(() => {
        input = 'javascript:alert("xss")'
        result = validateUrl(input)
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it uses a data URI', () => {
      beforeEach(() => {
        input = 'data:text/html,<script>alert("xss")</script>'
        result = validateUrl(input)
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it uses the file protocol', () => {
      beforeEach(() => {
        input = 'file:///etc/passwd'
        result = validateUrl(input)
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and it contains control characters', () => {
      beforeEach(() => {
        input = 'https://example.com/path\u0000'
        result = validateUrl(input)
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })

    describe('and the path contains double slashes', () => {
      beforeEach(() => {
        input = 'https://example.com//path'
        result = validateUrl(input)
      })
      it('should return false', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('when validating URL instances', () => {
    let url: URL
    let result: boolean

    describe('and the URL is safe', () => {
      beforeEach(() => {
        url = new URL('https://example.com/path')
        result = validateUrlInstance(url)
      })
      it('should validate successfully', () => {
        expect(result).toBe(true)
      })
    })

    describe('and the URL is malicious', () => {
      beforeEach(() => {
        url = new URL('javascript:alert("xss")')
        result = validateUrlInstance(url)
      })
      it('should reject the input', () => {
        expect(result).toBe(false)
      })
    })
  })

  describe('when checking URL length limits', () => {
    describe('and the URL is longer than 4KB', () => {
      let longUrl: string

      beforeEach(() => {
        longUrl = 'https://example.com/' + 'a'.repeat(4096)
      })

      it('should reject the URL', () => {
        expect(validateUrl(longUrl)).toBe(false)
      })
    })

    describe('and the URL is within length limits', () => {
      let normalUrl: string

      beforeEach(() => {
        normalUrl = 'https://example.com/path'
      })

      it('should accept the URL', () => {
        expect(validateUrl(normalUrl)).toBe(true)
      })
    })
  })

  describe('when applying SSRF protection', () => {
    describe('and localhost is not allowed (default)', () => {
      it('should reject localhost URLs', () => {
        expect(validateUrl('http://localhost/path')).toBe(false)
      })

      it('should reject loopback IP URLs', () => {
        expect(validateUrl('https://127.0.0.1/path')).toBe(false)
      })

      it('should reject private IP ranges', () => {
        expect(validateUrl('http://10.0.0.1/path')).toBe(false)
      })

      it('should reject 192.168.x.x range', () => {
        expect(validateUrl('http://192.168.1.1/path')).toBe(false)
      })

      it('should reject 172.16.x.x range', () => {
        expect(validateUrl('http://172.16.0.1/path')).toBe(false)
      })

      it('should reject .local domains', () => {
        expect(validateUrl('http://internal.local/path')).toBe(false)
      })

      it('should accept public domains', () => {
        expect(validateUrl('https://example.com/path')).toBe(true)
      })
    })

    describe('and localhost is allowed for development', () => {
      const devConfig: UrlValidationConfig = { allowLocalhost: true }

      it('should accept localhost URLs', () => {
        expect(validateUrl('http://localhost/path', devConfig)).toBe(true)
      })

      it('should accept loopback IP URLs', () => {
        expect(validateUrl('https://127.0.0.1/path', devConfig)).toBe(true)
      })

      it('should accept private IP ranges', () => {
        expect(validateUrl('http://10.0.0.1/path', devConfig)).toBe(true)
      })

      it('should accept 192.168.x.x range', () => {
        expect(validateUrl('http://192.168.1.1/path', devConfig)).toBe(true)
      })

      it('should accept .local domains', () => {
        expect(validateUrl('http://internal.local/path', devConfig)).toBe(true)
      })
    })
  })

  describe('when enforcing protocol restrictions', () => {
    describe('and the protocol is javascript', () => {
      it('should reject the URL', () => {
        expect(validateUrl('javascript:alert("xss")')).toBe(false)
      })
    })

    describe('and the protocol is data', () => {
      it('should reject the URL', () => {
        expect(validateUrl('data:text/html,<script>alert("xss")</script>')).toBe(false)
      })
    })

    describe('and the protocol is file', () => {
      it('should reject the URL', () => {
        expect(validateUrl('file:///etc/passwd')).toBe(false)
      })
    })

    describe('and the protocol is http', () => {
      it('should accept the URL', () => {
        expect(validateUrl('http://example.com/path')).toBe(true)
      })
    })

    describe('and the protocol is https', () => {
      it('should accept the URL', () => {
        expect(validateUrl('https://example.com/path')).toBe(true)
      })
    })
  })

  describe('when enforcing port restrictions', () => {
    describe('and using default allowed ports', () => {
      it('should reject disallowed port 22', () => {
        expect(validateUrl('https://example.com:22/path')).toBe(false)
      })

      it('should reject disallowed port 25', () => {
        expect(validateUrl('https://example.com:25/path')).toBe(false)
      })

      it('should reject disallowed port 3389', () => {
        expect(validateUrl('https://example.com:3389/path')).toBe(false)
      })

      it('should accept allowed port 80', () => {
        expect(validateUrl('https://example.com:80/path')).toBe(true)
      })

      it('should accept allowed port 443', () => {
        expect(validateUrl('https://example.com:443/path')).toBe(true)
      })

      it('should reject non-standard port 8080', () => {
        expect(validateUrl('https://example.com:8080/path')).toBe(false)
      })

      it('should reject non-standard port 3000', () => {
        expect(validateUrl('https://example.com:3000/path')).toBe(false)
      })
    })

    describe('and using custom allowed ports for development', () => {
      const devConfig: UrlValidationConfig = { allowedPorts: ['3000', '8080'] }

      it('should accept development port 3000', () => {
        expect(validateUrl('https://example.com:3000/path', devConfig)).toBe(true)
      })

      it('should accept development port 8080', () => {
        expect(validateUrl('https://example.com:8080/path', devConfig)).toBe(true)
      })

      it('should still reject non-development ports', () => {
        expect(validateUrl('https://example.com:22/path', devConfig)).toBe(false)
      })

      it('should still accept default ports', () => {
        expect(validateUrl('https://example.com:80/path', devConfig)).toBe(true)
      })
    })
  })

  describe('when validating fragments', () => {
    describe('and the fragment contains null character', () => {
      it('should reject the URL', () => {
        expect(validateUrl('https://example.com/path#\u0000')).toBe(false)
      })
    })

    describe('and the fragment contains bidi control', () => {
      it('should reject the URL', () => {
        expect(validateUrl('https://example.com/path#\u202E')).toBe(false)
      })
    })

    describe('and the fragment is safe', () => {
      it('should accept the URL', () => {
        expect(validateUrl('https://example.com/path#section')).toBe(true)
      })
    })

    describe('and the fragment contains bidirectional text', () => {
      it('should reject the URL', () => {
        expect(validateUrl('https://example.com/path#\u202Eevil')).toBe(false)
      })
    })
  })

  describe('when validating relative URLs and decoding edge cases', () => {
    describe('and the URL is a relative path', () => {
      it('should accept the URL', () => {
        expect(validateUrl('/path/to/resource')).toBe(true)
      })
    })

    describe('and the URL is protocol-relative', () => {
      it('should reject the URL', () => {
        expect(validateUrl('//evil.com/path')).toBe(false)
      })
    })

    describe('and the URL contains encoded backslash', () => {
      it('should reject the URL after decode', () => {
        expect(validateUrl('https://example.com/path%5C')).toBe(false)
      })
    })

    describe('and the URL contains encoded control character', () => {
      it('should reject the URL after decode', () => {
        expect(validateUrl('https://example.com/path%0a')).toBe(false)
      })
    })

    describe('and the URL is IPv6 localhost literal', () => {
      it('should reject the URL', () => {
        expect(validateUrl('http://[::1]/path')).toBe(false)
      })
    })

    describe('and the relative path contains double slashes', () => {
      it('should reject the URL', () => {
        expect(validateUrl('/a//b')).toBe(false)
      })
    })

    describe('and the URL contains path traversal', () => {
      it('should reject the URL', () => {
        expect(validateUrl('https://example.com/..../etc/passwd')).toBe(false)
      })
    })

    describe('and the URL contains embedded credentials', () => {
      it('should reject the URL', () => {
        expect(validateUrl('https://user:pass@example.com/path')).toBe(false)
      })
    })

    describe('and the URL contains Unicode control characters after normalization', () => {
      it('should reject the URL', () => {
        const combiningControl = '\u0300\u0000'
        expect(validateUrl(`https://example.com/path${combiningControl}`)).toBe(false)
      })
    })

    describe('and the URL contains Unicode bidirectional text after normalization', () => {
      it('should reject the URL', () => {
        const bidiText = '\u202E\u0065\u0076\u0069\u006C'
        expect(validateUrl(`https://example.com/path${bidiText}`)).toBe(false)
      })
    })
  })

  describe('when enforcing path and query length limits', () => {
    describe('and the path is longer than 2KB', () => {
      let longPath: string

      beforeEach(() => {
        longPath = 'https://example.com/' + 'a'.repeat(2048)
      })

      it('should reject the URL', () => {
        expect(validateUrl(longPath)).toBe(false)
      })
    })

    describe('and the path is within length limits', () => {
      let normalPath: string

      beforeEach(() => {
        normalPath = 'https://example.com/normal/path'
      })

      it('should accept the URL', () => {
        expect(validateUrl(normalPath)).toBe(true)
      })
    })

    describe('and the query is longer than 2KB', () => {
      let longQuery: string

      beforeEach(() => {
        longQuery = 'https://example.com/path?' + 'a'.repeat(2048) + '=value'
      })

      it('should reject the URL', () => {
        expect(validateUrl(longQuery)).toBe(false)
      })
    })

    describe('and the query string length is exactly the limit', () => {
      let qs: string

      beforeEach(() => {
        qs = 'k1=' + 'v'.repeat(1024) + '&k2=' + 'v'.repeat(1017) // 2048
      })

      it('should accept the URL', () => {
        expect(validateUrl(`https://example.com/path?${qs}`)).toBe(true)
      })
    })

    describe('and the query string length exceeds the limit by one', () => {
      let qs: string

      beforeEach(() => {
        qs = 'k1=' + 'v'.repeat(1024) + '&k2=' + 'v'.repeat(1018) // 2049
      })

      it('should reject the URL', () => {
        expect(validateUrl(`https://example.com/path?${qs}`)).toBe(false)
      })
    })
  })

  describe('when validating parameter counts and sizes', () => {
    describe('and there are exactly 50 query parameters', () => {
      let params: string

      beforeEach(() => {
        params = new Array(50)
          .fill(0)
          .map((_, i) => `k${i}=v`)
          .join('&')
      })

      it('should accept the URL', () => {
        expect(validateUrl(`https://example.com/path?${params}`)).toBe(true)
      })
    })

    describe('and there are 51 query parameters', () => {
      let params: string

      beforeEach(() => {
        params = new Array(51)
          .fill(0)
          .map((_, i) => `k${i}=v`)
          .join('&')
      })

      it('should reject the URL', () => {
        expect(validateUrl(`https://example.com/path?${params}`)).toBe(false)
      })
    })

    describe('and the parameter key is exactly 128 characters', () => {
      let exactKey: string

      beforeEach(() => {
        exactKey = 'k'.repeat(128)
      })

      it('should accept the URL', () => {
        expect(validateUrl(`https://example.com/p?${exactKey}=v`)).toBe(true)
      })
    })

    describe('and the parameter key is 129 characters', () => {
      let oversizeKey: string

      beforeEach(() => {
        oversizeKey = 'k'.repeat(129)
      })

      it('should reject the URL', () => {
        expect(validateUrl(`https://example.com/p?${oversizeKey}=v`)).toBe(false)
      })
    })

    describe('and the parameter value is exactly 1024 characters', () => {
      let exactValue: string

      beforeEach(() => {
        exactValue = 'v'.repeat(1024)
      })

      it('should accept the URL', () => {
        expect(validateUrl(`https://example.com/p?k=${exactValue}`)).toBe(true)
      })
    })

    describe('and the parameter value is 1025 characters', () => {
      let oversizeValue: string

      beforeEach(() => {
        oversizeValue = 'v'.repeat(1025)
      })

      it('should reject the URL', () => {
        expect(validateUrl(`https://example.com/p?k=${oversizeValue}`)).toBe(false)
      })
    })

    describe('and the parameter key is empty', () => {
      it('should reject the URL', () => {
        expect(validateUrl('https://example.com/path?=value')).toBe(false)
      })
    })

    describe('and the parameter key is not empty', () => {
      it('should accept the URL', () => {
        expect(validateUrl('https://example.com/path?key=value')).toBe(true)
      })
    })
  })
})
