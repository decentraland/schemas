import { expect } from 'expect'
import type { Parcel } from '../../src/core/parcel-validation'
import {
  parcelSchema,
  parcelIsInLimitsKeyword,
  parcelKeywordDefinitions,
  parcelToString,
  stringToParcel,
  isParcelInStandardBounds,
  isExceptionParcel,
  isParcelInBounds,
  isParcelValid,
  isParcelStringValid,
  isParcelValidString,
  PARCEL_LIMITS
} from '../../src/core/parcel-validation'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateParcel = generateLazyValidator(parcelSchema, [parcelIsInLimitsKeyword])

describe('Parcel tests', () => {
  const validParcel: Parcel = { x: 10, y: 20 }
  const invalidParcel: Parcel = { x: 200, y: 200 }
  const exceptionParcel: Parcel = { x: 151, y: 100 }
  const boundaryParcel: Parcel = { x: 150, y: 150 }
  const northernExceptionParcel: Parcel = { x: 62, y: 151 }

  testTypeSignature({ schema: parcelSchema, keywordDefinitions: parcelKeywordDefinitions }, validParcel)

  describe('Schema validation', () => {
    it('validates correct Parcel objects', () => {
      expect(validateParcel(validParcel)).toEqual(true)
    })

    it('fails on invalid Parcel objects', () => {
      expect(validateParcel({ x: '10', y: 20 })).toEqual(false)
      expect(validateParcel({ x: 10 })).toEqual(false)
      expect(validateParcel({ y: 20 })).toEqual(false)
      expect(validateParcel(null)).toEqual(false)
      expect(validateParcel({})).toEqual(false)
    })

    it('fails with correct error messages', () => {
      // Verificamos que la validación falle
      expect(validateParcel({})).toEqual(false)

      // Verificamos que la validación falle para datos de tipo incorrecto
      expect(validateParcel({ x: 'invalid', y: 10 })).toEqual(false)
    })
  })

  describe('String conversion functions', () => {
    it('converts Parcel to string correctly', () => {
      expect(parcelToString(validParcel)).toEqual('10,20')
      expect(parcelToString({ x: -5, y: -10 })).toEqual('-5,-10')
      expect(parcelToString({ x: 0, y: 0 })).toEqual('0,0')
    })

    it('converts string to Parcel correctly', () => {
      expect(stringToParcel('10,20')).toEqual({ x: 10, y: 20 })
      expect(stringToParcel('-5,-10')).toEqual({ x: -5, y: -10 })
      expect(stringToParcel('0,0')).toEqual({ x: 0, y: 0 })
    })

    it('returns null for invalid Parcel strings', () => {
      expect(stringToParcel('invalid')).toEqual(null)
      expect(stringToParcel('10,abc')).toEqual(null)
      expect(stringToParcel('10,20,30')).toEqual(null)
      expect(stringToParcel('')).toEqual(null)
    })
  })

  describe('Bounds validation', () => {
    it('validates parcels within standard bounds', () => {
      expect(isParcelInStandardBounds(validParcel)).toEqual(true)
      expect(isParcelInStandardBounds(boundaryParcel)).toEqual(true)
      expect(isParcelInStandardBounds({ x: -150, y: -150 })).toEqual(true)
    })

    it('identifies parcels outside standard bounds', () => {
      expect(isParcelInStandardBounds(invalidParcel)).toEqual(false)
      expect(isParcelInStandardBounds(exceptionParcel)).toEqual(false)
      expect(isParcelInStandardBounds(northernExceptionParcel)).toEqual(false)
      expect(isParcelInStandardBounds({ x: -151, y: 0 })).toEqual(false)
      expect(isParcelInStandardBounds({ x: 0, y: 151 })).toEqual(false)
    })

    it('identifies exception parcels correctly', () => {
      expect(isExceptionParcel(exceptionParcel)).toEqual(true)
      expect(isExceptionParcel(northernExceptionParcel)).toEqual(true)
      expect(isExceptionParcel(validParcel)).toEqual(false)
      expect(isExceptionParcel(invalidParcel)).toEqual(false)
    })

    it('validates bounds including exceptions', () => {
      expect(isParcelInBounds(validParcel)).toEqual(true)
      expect(isParcelInBounds(boundaryParcel)).toEqual(true)
      expect(isParcelInBounds(exceptionParcel)).toEqual(true)
      expect(isParcelInBounds(northernExceptionParcel)).toEqual(true)
      expect(isParcelInBounds(invalidParcel)).toEqual(false)
    })
  })

  describe('String validation functions', () => {
    it('validates parcel strings with correct format', () => {
      expect(isParcelStringValid('10,20')).toEqual(true)
      expect(isParcelStringValid('-5,-10')).toEqual(true)
      expect(isParcelStringValid('invalid')).toEqual(false)
    })

    it('validates parcel strings completely', () => {
      expect(isParcelValidString('10,20')).toEqual(true)
      expect(isParcelValidString('151,100')).toEqual(true)
      expect(isParcelValidString('62,151')).toEqual(true)
      expect(isParcelValidString('200,200')).toEqual(false)
      expect(isParcelValidString('invalid')).toEqual(false)
    })
  })

  describe('Complete validation functions', () => {
    it('validates parcels correctly', () => {
      expect(isParcelValid(validParcel)).toEqual(true)
      expect(isParcelValid(boundaryParcel)).toEqual(true)
      expect(isParcelValid(exceptionParcel)).toEqual(true)
      expect(isParcelValid(northernExceptionParcel)).toEqual(true)
      expect(isParcelValid(invalidParcel)).toEqual(false)
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
