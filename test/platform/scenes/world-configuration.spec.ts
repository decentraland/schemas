import expect from 'expect'
import { WorldConfiguration } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('World Configuration tests', () => {
  const worldConfiguration: WorldConfiguration = {
    name: 'some-name.dcl.eth'
  }

  testTypeSignature(WorldConfiguration, worldConfiguration)

  it('static tests must pass', () => {
    expect(WorldConfiguration.validate(worldConfiguration)).toBeTruthy()
    expect(WorldConfiguration.validate({})).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toEqual([
      {
        keyword: "required",
        message: "must have required property 'name'",
        instancePath: "",
        params: {missingProperty: "name"},
        schemaPath: "#/required"
      }
    ])
    expect(WorldConfiguration.validate(null)).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toEqual([
      {
        instancePath: "",
        keyword: "type",
        message: "must be object",
        params: {type: "object"},
        schemaPath: "#/type"
      }
    ])
  })

  it('name must be present', () => {
    expect(WorldConfiguration.validate({ skybox: 20 })).toBeFalsy()
  })

  it('skybox, if present, must be a number', () => {
    expect(WorldConfiguration.validate({
      ...worldConfiguration,
      skybox: '233'
    })).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toMatchObject([{
      instancePath: '/skybox',
      message: 'must be number'
    }])
  })

  it('minimapVisible, if present, must be boolean', () => {
    expect(WorldConfiguration.validate({
      ...worldConfiguration,
      minimapVisible: '233'
    })).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toMatchObject([{
      instancePath: '/minimapVisible',
      message: 'must be boolean'
    }])
  })

  it('fixedAdapter, if present, must be a string', () => {
    expect(WorldConfiguration.validate({
      ...worldConfiguration,
      fixedAdapter: 233
    })).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toMatchObject([{
      instancePath: '/fixedAdapter',
      message: 'must be string'
    }])
  })
})
