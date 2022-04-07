import expect from 'expect'
import { WearableGender } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('WearableGender tests', () => {
  const wearableGender: WearableGender = WearableGender.MALE

  testTypeSignature(WearableGender, wearableGender)

  it('static tests must pass', () => {
    expect(WearableGender.validate(wearableGender)).toEqual(true)
    expect(WearableGender.validate(null)).toEqual(false)
    expect(WearableGender.validate({})).toEqual(false)
  })
})
