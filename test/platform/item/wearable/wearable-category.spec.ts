import expect from 'expect'
import { BodyPartCategory, WearableCategory } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'

describe('WearableCategory tests', () => {
  const wearableCategory: WearableCategory = WearableCategory.HELMET

  testTypeSignature(WearableCategory, wearableCategory)

  it('static tests must pass', () => {
    expect(WearableCategory.validate(wearableCategory)).toEqual(true)
    expect(WearableCategory.validate(null)).toEqual(false)
    expect(WearableCategory.validate({})).toEqual(false)
  })

  it('hands is not a wearable category', () => {
    expect(WearableCategory.validate(BodyPartCategory.HANDS)).toEqual(false)
  })
})
