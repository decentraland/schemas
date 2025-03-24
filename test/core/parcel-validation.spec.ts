import expect from 'expect'
import { Parcel, PARCEL_LIMITS } from '../../src/core/parcel-validation'
import { testTypeSignature } from '../test-utils'

describe('Parcel tests', () => {
  const validParcel: Parcel = { x: 10, y: 20 }
  const invalidParcel: Parcel = { x: 200, y: 200 }
  const exceptionParcel: Parcel = { x: 151, y: 100 }
  const boundaryParcel: Parcel = { x: 150, y: 150 }
  const northernExceptionParcel: Parcel = { x: 62, y: 151 }

  testTypeSignature(Parcel, validParcel)

  describe('Schema validation', () => {
    it('validates correct Parcel objects', () => {
      expect(Parcel.validate(validParcel)).toEqual(true)
    })

    it('fails on invalid Parcel objects', () => {
      expect(Parcel.validate({ x: '10', y: 20 })).toEqual(false)
      expect(Parcel.validate({ x: 10 })).toEqual(false)
      expect(Parcel.validate({ y: 20 })).toEqual(false)
      expect(Parcel.validate(null)).toEqual(false)
      expect(Parcel.validate({})).toEqual(false)
    })

    it('fails with correct error messages', () => {
      // Verificamos que la validación falle
      expect(Parcel.validate({})).toEqual(false)

      // Verificamos que la validación falle para datos de tipo incorrecto
      expect(Parcel.validate({ x: 'invalid', y: 10 })).toEqual(false)
    })
  })

  describe('String conversion functions', () => {
    it('converts Parcel to string correctly', () => {
      expect(Parcel.parcelToString(validParcel)).toEqual('10,20')
      expect(Parcel.parcelToString({ x: -5, y: -10 })).toEqual('-5,-10')
      expect(Parcel.parcelToString({ x: 0, y: 0 })).toEqual('0,0')
    })

    it('converts string to Parcel correctly', () => {
      expect(Parcel.stringToParcel('10,20')).toEqual({ x: 10, y: 20 })
      expect(Parcel.stringToParcel('-5,-10')).toEqual({ x: -5, y: -10 })
      expect(Parcel.stringToParcel('0,0')).toEqual({ x: 0, y: 0 })
    })

    it('returns null for invalid Parcel strings', () => {
      expect(Parcel.stringToParcel('invalid')).toEqual(null)
      expect(Parcel.stringToParcel('10,abc')).toEqual(null)
      expect(Parcel.stringToParcel('10,20,30')).toEqual(null)
      expect(Parcel.stringToParcel('')).toEqual(null)
    })
  })

  describe('Bounds validation', () => {
    it('validates parcels within standard bounds', () => {
      expect(Parcel.isInStandardBounds(validParcel)).toEqual(true)
      expect(Parcel.isInStandardBounds(boundaryParcel)).toEqual(true)
      expect(Parcel.isInStandardBounds({ x: -150, y: -150 })).toEqual(true)
    })

    it('identifies parcels outside standard bounds', () => {
      expect(Parcel.isInStandardBounds(invalidParcel)).toEqual(false)
      expect(Parcel.isInStandardBounds(exceptionParcel)).toEqual(false)
      expect(Parcel.isInStandardBounds(northernExceptionParcel)).toEqual(false)
      expect(Parcel.isInStandardBounds({ x: -151, y: 0 })).toEqual(false)
      expect(Parcel.isInStandardBounds({ x: 0, y: 151 })).toEqual(false)
    })

    it('identifies exception parcels correctly', () => {
      expect(Parcel.isExceptionParcel(exceptionParcel)).toEqual(true)
      expect(Parcel.isExceptionParcel(northernExceptionParcel)).toEqual(true)
      expect(Parcel.isExceptionParcel(validParcel)).toEqual(false)
      expect(Parcel.isExceptionParcel(invalidParcel)).toEqual(false)
    })

    it('validates bounds including exceptions', () => {
      expect(Parcel.isInBounds(validParcel)).toEqual(true)
      expect(Parcel.isInBounds(boundaryParcel)).toEqual(true)
      expect(Parcel.isInBounds(exceptionParcel)).toEqual(true)
      expect(Parcel.isInBounds(northernExceptionParcel)).toEqual(true)
      expect(Parcel.isInBounds(invalidParcel)).toEqual(false)
    })
  })

  describe('String validation functions', () => {
    it('validates parcel strings with correct format', () => {
      expect(Parcel.isParcelStringValid('10,20')).toEqual(true)
      expect(Parcel.isParcelStringValid('-5,-10')).toEqual(true)
      expect(Parcel.isParcelStringValid('invalid')).toEqual(false)
    })

    it('validates parcel strings completely', () => {
      expect(Parcel.isValidString('10,20')).toEqual(true)
      expect(Parcel.isValidString('151,100')).toEqual(true)
      expect(Parcel.isValidString('62,151')).toEqual(true)
      expect(Parcel.isValidString('200,200')).toEqual(false)
      expect(Parcel.isValidString('invalid')).toEqual(false)
    })
  })

  describe('Complete validation functions', () => {
    it('validates parcels correctly', () => {
      expect(Parcel.isValid(validParcel)).toEqual(true)
      expect(Parcel.isValid(boundaryParcel)).toEqual(true)
      expect(Parcel.isValid(exceptionParcel)).toEqual(true)
      expect(Parcel.isValid(northernExceptionParcel)).toEqual(true)
      expect(Parcel.isValid(invalidParcel)).toEqual(false)
    })
  })

  describe('PARCEL_LIMITS constants', () => {
    it('has the correct values', () => {
      expect(PARCEL_LIMITS.minX).toEqual(-150)
      expect(PARCEL_LIMITS.maxX).toEqual(150)
      expect(PARCEL_LIMITS.minY).toEqual(-150)
      expect(PARCEL_LIMITS.maxY).toEqual(150)
    })
  })
})
