import expect from 'expect'
import { EmoteCategory } from '../src'
import { testTypeSignature } from './test-utils'

describe('EmoteCategory tests', () => {
  const wearableCategory: EmoteCategory = EmoteCategory.SIMPLE

  testTypeSignature(EmoteCategory, wearableCategory)

  it('static tests must pass', () => {
    expect(EmoteCategory.validate(wearableCategory)).toEqual(true)
    expect(EmoteCategory.validate(null)).toEqual(false)
    expect(EmoteCategory.validate({})).toEqual(false)
  })
})
