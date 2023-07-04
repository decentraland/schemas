import expect from 'expect'
import { PortableExperience, PermissionItem } from '../../../src'

describe('Portable experiences tests', () => {
  const toggles: PortableExperience = {
    permission: PermissionItem.PI_ALLOW
  }

  it('type has a "schema" object', () => {
    expect(typeof PortableExperience.schema).toEqual('object')
  })

  it('type has a "validate" function', () => {
    expect(typeof PortableExperience.validate).toEqual('function')
  })

  it('static tests must pass', () => {
    expect(PortableExperience.validate(toggles)).toEqual(true)
    expect(PortableExperience.validate({})).toEqual(true)
    expect(PortableExperience.validate(null)).toEqual(false)
  })

  it('feature with number value fails', () => {
    expect(PortableExperience.validate({ permission: 1 })).toEqual(false)
  })

  it('feature with boolean value fails', () => {
    expect(PortableExperience.validate({ permission: true })).toEqual(false)
  })

  it('feature with object value fails', () => {
    expect(PortableExperience.validate({ permission: {} })).toEqual(false)
  })

  it('feature with other string value fails', () => {
    expect(PortableExperience.validate({ permission: 'some-value' })).toEqual(false)
    expect(PortableExperience.validate.errors).toMatchObject([
      {
        instancePath: '/permission',
        message: `permission should be one of: ${Object.values(PermissionItem).join(', ')}`
      }
    ])
  })
})
