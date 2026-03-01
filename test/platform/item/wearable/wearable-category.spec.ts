import { expect } from 'expect'
import { BodyPartCategory, WearableCategory, wearableCategorySchema } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'
import { generateLazyValidator } from '../../../../src/validation/index.js'

const validateWearableCategory = generateLazyValidator(wearableCategorySchema)

describe('WearableCategory tests', () => {
  const wearableCategory: WearableCategory = WearableCategory.HELMET

  testTypeSignature({ schema: wearableCategorySchema }, wearableCategory)

  it('static tests must pass', () => {
    expect(validateWearableCategory(wearableCategory)).toEqual(true)
    expect(validateWearableCategory(null)).toEqual(false)
    expect(validateWearableCategory({})).toEqual(false)
  })

  it('hands is not a wearable category', () => {
    expect(validateWearableCategory(BodyPartCategory.HANDS)).toEqual(false)
  })
})
