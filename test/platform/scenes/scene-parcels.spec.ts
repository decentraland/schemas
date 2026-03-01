import { expect } from 'expect'
import type { SceneParcels } from '../../../src'
import { sceneParcelsSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateSceneParcels = generateLazyValidator(sceneParcelsSchema)

describe('Scene parcels tests', () => {
  const parcels: SceneParcels = {
    base: '0,0',
    parcels: ['0,0', '1,0']
  }

  testTypeSignature({ schema: sceneParcelsSchema }, parcels)

  it('static tests must pass', () => {
    expect(validateSceneParcels(parcels)).toEqual(true)
    expect(validateSceneParcels(null)).toEqual(false)
    expect(validateSceneParcels({})).toEqual(false)
  })

  it('non-parcel string fails', () => {
    expect(validateSceneParcels({ base: '1-1', parcels: ['1-1'] })).toEqual(false)
  })

  it('when base is not in parcels fails', () => {
    expect(validateSceneParcels({ ...parcels, base: ['2,0'] })).toEqual(false)
  })

  it('empty parcels fails', () => {
    expect(validateSceneParcels({ ...parcels, parcels: [] })).toEqual(false)
  })
})
