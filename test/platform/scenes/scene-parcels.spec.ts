import expect from 'expect'
import { SceneParcels } from '../../../src'
import { testTypeSignature } from '../../test-utils'

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
})
