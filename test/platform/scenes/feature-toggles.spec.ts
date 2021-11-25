import expect from 'expect'
import { FeatureToggles } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Feature toggles tests', () => {
  const toggles: FeatureToggles = {
    'voice-chat': 'disabled',
    'other-feature': 'enabled'
  }

  testTypeSignature(FeatureToggles, toggles)

  it('static tests must pass', () => {
    expect(FeatureToggles.validate(toggles)).toEqual(true)
    expect(FeatureToggles.validate({})).toEqual(true)
    expect(FeatureToggles.validate(null)).toEqual(false)
  })

  it('feature with number value fails', () => {
    expect(FeatureToggles.validate({ 'voice-chat': 1 })).toEqual(false)
  })

  it('feature with boolean value fails', () => {
    expect(FeatureToggles.validate({ 'voice-chat': true })).toEqual(false)
  })

  it('feature with object value fails', () => {
    expect(FeatureToggles.validate({ 'voice-chat': {} })).toEqual(false)
  })

  it('feature with other string value fails', () => {
    expect(FeatureToggles.validate({ 'voice-chat': 'not-valid' })).toEqual(
      false
    )
  })
})
