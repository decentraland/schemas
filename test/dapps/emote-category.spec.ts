import expect from 'expect'
import { EmoteCategory } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('EmoteCategory tests', () => {
  const emoteCategory: EmoteCategory = EmoteCategory.DANCE

  testTypeSignature(EmoteCategory, emoteCategory)

  it('static tests must pass', () => {
    expect(EmoteCategory.validate(emoteCategory)).toEqual(true)
    expect(EmoteCategory.validate(null)).toEqual(false)
    expect(EmoteCategory.validate({})).toEqual(false)
  })
})
