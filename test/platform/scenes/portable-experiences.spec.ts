import expect from 'expect'
import { PortableExperiences, PermissionItem } from '../../../src'

describe('Portable experiences tests', () => {
  const toggles: PortableExperiences = {
    permission: PermissionItem.PI_ALLOW
  }

  it('type has a "schema" object', () => {
    expect(typeof PortableExperiences.schema).toEqual('object')
  })

  it('type has a "validate" function', () => {
    expect(typeof PortableExperiences.validate).toEqual('function')
  })

  it('static tests must pass', () => {
    expect(PortableExperiences.validate(toggles)).toEqual(true)
    expect(PortableExperiences.validate({})).toEqual(true)
    expect(PortableExperiences.validate(null)).toEqual(false)
  })

  it('feature with number value fails', () => {
    expect(PortableExperiences.validate({ permission: 1 })).toEqual(false)
  })

  it('feature with boolean value fails', () => {
    expect(PortableExperiences.validate({ permission: true })).toEqual(false)
  })

  it('feature with object value fails', () => {
    expect(PortableExperiences.validate({ permission: {} })).toEqual(false)
  })

  it('feature with other string value fails', () => {
    expect(PortableExperiences.validate({ permission: 'some-value' })).toEqual(false)
  })
})
