import { expect } from 'expect'
import type { FeatureToggles } from '../../../src'
import { featureTogglesSchema } from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateFeatureToggles = generateLazyValidator(featureTogglesSchema)

describe('Feature toggles tests', () => {
  const toggles: FeatureToggles = {
    voiceChat: 'disabled',
    portableExperiences: 'hideUi'
  }

  it('type has a "schema" object', () => {
    expect(typeof featureTogglesSchema).toEqual('object')
  })

  it('type has a "validate" function', () => {
    expect(typeof validateFeatureToggles).toEqual('function')
  })

  it('static tests must pass', () => {
    expect(validateFeatureToggles(toggles)).toEqual(true)
    expect(validateFeatureToggles({})).toEqual(true)
    expect(validateFeatureToggles(null)).toEqual(false)
  })

  it('feature with number value fails', () => {
    expect(validateFeatureToggles({ voiceChat: 1 })).toEqual(false)
  })

  it('feature with boolean value fails', () => {
    expect(validateFeatureToggles({ voiceChat: true })).toEqual(false)
  })

  it('feature with object value fails', () => {
    expect(validateFeatureToggles({ voiceChat: {} })).toEqual(false)
  })

  it('feature with other string value fails', () => {
    expect(validateFeatureToggles({ voiceChat: 'not-valid' })).toEqual(false)
  })

  it('default error message', () => {
    validateFeatureToggles({ voiceChat: 'not-valid' })
    expect(validateFeatureToggles.errors).toMatchObject([
      {
        instancePath: '',
        message: 'valid options are enabled, disabled'
      }
    ])
  })

  it('portableExperiences error message', () => {
    expect(validateFeatureToggles({ portableExperiences: 'not-valid' })).toEqual(false)
    expect(validateFeatureToggles.errors).toMatchObject([
      {
        instancePath: '/portableExperiences',
        message: 'valid options are enabled, disabled, hideUi'
      }
    ])
  })
})
