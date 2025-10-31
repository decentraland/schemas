import expect from 'expect'
import { LinkerAuthorization } from '../../src'

describe('when validation authorizations', () => {
  describe('and the authorization does not include a name', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: ['-73,50']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization does not include a description', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: ['-73,50']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization does not include the contact information', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: ['-73,50']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization contains an empty contact information', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {},
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: ['-73,50']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization does not include the addresses', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          plots: ['-73,50']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization contains an empty list of addresses', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: [],
          plots: ['-73,50']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization does not include the plots', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43']
        })
      ).toBe(false)
    })
  })

  describe('and the authorization contains an empty list of plots', () => {
    it('should return false', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: []
        })
      ).toBe(false)
    })
  })

  describe('and the authorization is formatted accordingly', () => {
    it('should return true', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: ['-73,50']
        })
      ).toBe(true)
    })
  })

  describe('and the authorization has the onlyDev property set as a boolean', () => {
    it('should return true', () => {
      expect(
        LinkerAuthorization.validate({
          name: 'aName',
          desc: 'aDesc',
          contactInfo: {
            name: 'aContactInfoName'
          },
          addresses: ['0x4730182099bc4e60075C657cCeCEc8879826bb43'],
          plots: ['-73,50'],
          onlyDev: true
        })
      ).toBe(true)
    })
  })
})
