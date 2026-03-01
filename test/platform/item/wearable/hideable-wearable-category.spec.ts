import { expect } from 'expect'
import type { HideableWearableCategory } from '../../../../src'
import { BodyPartCategory, hideableWearableCategorySchema, WearableCategory } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'
import { generateLazyValidator } from '../../../../src/validation/index.js'

const validateHideableWearableCategory = generateLazyValidator(hideableWearableCategorySchema)

describe('HideableWearableCategory tests', () => {
  const hideableWearableCategories: HideableWearableCategory[] = [BodyPartCategory.HANDS, WearableCategory.EYES]

  testTypeSignature({ schema: hideableWearableCategorySchema }, hideableWearableCategories[0])
  testTypeSignature({ schema: hideableWearableCategorySchema }, hideableWearableCategories[1])

  it('static tests must pass', () => {
    expect(validateHideableWearableCategory(hideableWearableCategories[0])).toEqual(true)
    expect(validateHideableWearableCategory(hideableWearableCategories[1])).toEqual(true)
    expect(validateHideableWearableCategory(null)).toEqual(false)
    expect(validateHideableWearableCategory({})).toEqual(false)
  })
})
