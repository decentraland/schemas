import expect from 'expect'
import { WearableCategory } from '../src'
import { testTypeSignature } from './test-utils'

describe('WearableCategory tests', () => {
  const wearableCategory: WearableCategory = WearableCategory.HELMET

  testTypeSignature(WearableCategory, wearableCategory)

  it('static tests must pass', () => {
    expect(WearableCategory.validate(wearableCategory)).toEqual(true)
    expect(WearableCategory.validate(null)).toEqual(false)
    expect(WearableCategory.validate({})).toEqual(false)
  })
})
