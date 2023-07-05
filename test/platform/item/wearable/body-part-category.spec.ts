import expect from 'expect'
import { BodyPartCategory, WearableCategory } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'

describe('BodyPartCategory tests', () => {
  const bodyPartCategory: BodyPartCategory = BodyPartCategory.HANDS

  testTypeSignature(BodyPartCategory, bodyPartCategory)

  it('static tests must pass', () => {
    expect(BodyPartCategory.validate(bodyPartCategory)).toEqual(true)
    expect(BodyPartCategory.validate(null)).toEqual(false)
    expect(BodyPartCategory.validate({})).toEqual(false)
  })

  it('hat is not a body part category', () => {
    expect(BodyPartCategory.validate(WearableCategory.HAT)).toEqual(false)
  })
})
