import { expect } from 'expect'
import { EmoteCategory, emoteCategorySchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateEmoteCategory = generateLazyValidator(emoteCategorySchema)

describe('EmoteCategory tests', () => {
  const emoteCategory: EmoteCategory = EmoteCategory.DANCE

  testTypeSignature({ schema: emoteCategorySchema }, emoteCategory)

  it('static tests must pass', () => {
    expect(validateEmoteCategory(emoteCategory)).toEqual(true)
    expect(validateEmoteCategory(null)).toEqual(false)
    expect(validateEmoteCategory({})).toEqual(false)
  })
})
