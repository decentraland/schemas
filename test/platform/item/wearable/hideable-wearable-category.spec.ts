import expect from 'expect'
import { BodyPartCategory, HideableWearableCategory, WearableCategory } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'

describe('HideableWearableCategory tests', () => {
  const hideableWearableCategories: HideableWearableCategory[] = [BodyPartCategory.HANDS, WearableCategory.EYES]

  testTypeSignature(HideableWearableCategory, hideableWearableCategories[0])
  testTypeSignature(HideableWearableCategory, hideableWearableCategories[1])

  it('static tests must pass', () => {
    expect(HideableWearableCategory.validate(hideableWearableCategories[0])).toEqual(true)
    expect(HideableWearableCategory.validate(hideableWearableCategories[1])).toEqual(true)
    expect(HideableWearableCategory.validate(null)).toEqual(false)
    expect(HideableWearableCategory.validate({})).toEqual(false)
  })
})
