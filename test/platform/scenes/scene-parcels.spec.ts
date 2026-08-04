import expect from 'expect'
import { SceneParcels, ValidateFunction } from '../../../src'
import { compileExportedSchema, testTypeSignature } from '../../test-utils'

describe('Scene parcels tests', () => {
  const parcels: SceneParcels = {
    base: '0,0',
    parcels: ['0,0', '1,0']
  }

  testTypeSignature(SceneParcels, parcels)

  it('static tests must pass', () => {
    expect(SceneParcels.validate(parcels)).toEqual(true)
    expect(SceneParcels.validate(null)).toEqual(false)
    expect(SceneParcels.validate({})).toEqual(false)
  })

  it('non-parcel string fails', () => {
    expect(SceneParcels.validate({ base: '1-1', parcels: ['1-1'] })).toEqual(false)
  })

  it('when base is not in parcels fails', () => {
    expect(SceneParcels.validate({ ...parcels, base: ['2,0'] })).toEqual(false)
  })

  it('empty parcels fails', () => {
    expect(SceneParcels.validate({ ...parcels, parcels: [] })).toEqual(false)
  })

  describe('when parcel coordinates have non-canonical aliases', () => {
    let aliasedParcels: SceneParcels

    beforeEach(() => {
      aliasedParcels = { base: '0,0', parcels: ['0,0', '00,0'] }
    })

    it('should reject the aliased coordinates', () => {
      expect(SceneParcels.validate(aliasedParcels)).toEqual(false)
    })
  })

  describe('when parcel coordinates are duplicated', () => {
    let duplicatedParcels: SceneParcels

    beforeEach(() => {
      duplicatedParcels = { base: '0,0', parcels: ['0,0', '0,0'] }
    })

    it('should reject the duplicated coordinates', () => {
      expect(SceneParcels.validate(duplicatedParcels)).toEqual(false)
    })
  })

  describe('when the base is outside the declared parcels', () => {
    let invalidScene: SceneParcels
    let directSchemaValidator: ValidateFunction<SceneParcels>

    beforeEach(() => {
      invalidScene = { base: '1,1', parcels: ['0,0'] }
      directSchemaValidator = compileExportedSchema(SceneParcels.schema)
    })

    it('should reject the value through the authoritative validator', () => {
      expect(SceneParcels.validate(invalidScene)).toEqual(false)
    })

    it('should reject the value when compiling the exported schema directly', () => {
      expect(directSchemaValidator(invalidScene)).toEqual(false)
    })

    it('should expose the AJV contains error', () => {
      SceneParcels.validate(invalidScene)

      expect(SceneParcels.validate.errors?.map((error) => error.keyword)).toContain('contains')
    })

    it('should preserve schemaValidator as a compatibility alias', () => {
      expect(SceneParcels.schemaValidator).toBe(SceneParcels.validate)
    })
  })

  describe('when a scene declares more than one thousand unique canonical parcels', () => {
    let largeScene: SceneParcels

    beforeEach(() => {
      largeScene = {
        base: '0,0',
        parcels: Array.from({ length: 1001 }, (_, index) => `${index},0`)
      }
    })

    it('should not impose a shared-schema parcel count limit', () => {
      expect(SceneParcels.validate(largeScene)).toEqual(true)
    })
  })
})
