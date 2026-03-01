import { expect } from 'expect'
import { BodyPartCategory, bodyPartCategorySchema, WearableCategory } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'
import { generateLazyValidator } from '../../../../src/validation/index.js'

const validateBodyPartCategory = generateLazyValidator(bodyPartCategorySchema)

describe('BodyPartCategory tests', () => {
  const bodyPartCategory: BodyPartCategory = BodyPartCategory.HANDS

  testTypeSignature({ schema: bodyPartCategorySchema }, bodyPartCategory)

  it('static tests must pass', () => {
    expect(validateBodyPartCategory(bodyPartCategory)).toEqual(true)
    expect(validateBodyPartCategory(null)).toEqual(false)
    expect(validateBodyPartCategory({})).toEqual(false)
  })

  it('hat is not a body part category', () => {
    expect(validateBodyPartCategory(WearableCategory.HAT)).toEqual(false)
  })
})
