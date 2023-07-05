import expect from 'expect'
import { FeatureToggles } from '../../../src'

describe('Feature toggles tests', () => {
  const toggles: FeatureToggles = {
    voiceChat: 'disabled',
    portableExperiences: 'hideUi'
  }

  it('type has a "schema" object', () => {
    expect(typeof FeatureToggles.schema).toEqual('object')
  })

  it('type has a "validate" function', () => {
    expect(typeof FeatureToggles.validate).toEqual('function')
  })

  it('static tests must pass', () => {
    expect(FeatureToggles.validate(toggles)).toEqual(true)
    expect(FeatureToggles.validate({})).toEqual(true)
    expect(FeatureToggles.validate(null)).toEqual(false)
  })

  it('feature with number value fails', () => {
    expect(FeatureToggles.validate({ voiceChat: 1 })).toEqual(false)
  })

  it('feature with boolean value fails', () => {
    expect(FeatureToggles.validate({ voiceChat: true })).toEqual(false)
  })

  it('feature with object value fails', () => {
    expect(FeatureToggles.validate({ voiceChat: {} })).toEqual(false)
  })

  it('feature with other string value fails', () => {
    expect(FeatureToggles.validate({ voiceChat: 'not-valid' })).toEqual(false)
  })

  it('default error message', () => {
    FeatureToggles.validate({ voiceChat: 'not-valid' })
    expect(FeatureToggles.validate.errors).toMatchObject([
      {
        instancePath: '',
        message: 'valid options are enabled, disabled'
      }
    ])
  })

  it('portableExperiences error message', () => {
    expect(FeatureToggles.validate({ portableExperiences: 'not-valid' })).toEqual(false)
    expect(FeatureToggles.validate.errors).toMatchObject([
      {
        instancePath: '/portableExperiences',
        message: 'valid options are enabled, disabled, hideUi'
      }
    ])
  })
})
