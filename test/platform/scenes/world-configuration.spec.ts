import expect from 'expect'
import { validateType, WorldConfiguration } from '../../../src'

describe('World Configuration tests', () => {
  const worldConfiguration: WorldConfiguration = {
    name: 'some-name.dcl.eth'
  }

  it('type has a "schema" object', () => {
    expect(typeof WorldConfiguration.schema).toEqual('object')
  })

  it('type has a "validate" function', () => {
    expect(typeof WorldConfiguration.validate).toEqual('function')
  })

  it('evaluate a valid example', () => {
    expect(WorldConfiguration.validate(worldConfiguration)).toEqual(true)
    expect(validateType(WorldConfiguration, worldConfiguration)).toEqual(true)
  })

  it('static tests must pass', () => {
    expect(WorldConfiguration.validate(worldConfiguration)).toBeTruthy()
    expect(WorldConfiguration.validate({})).toBeTruthy()
    expect(WorldConfiguration.validate(null)).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toEqual([
      {
        instancePath: '',
        keyword: 'type',
        message: 'must be object',
        params: { type: 'object' },
        schemaPath: '#/type'
      }
    ])
  })

  it('name, if present, must be a string', () => {
    expect(WorldConfiguration.validate({ name: 20 })).toBeFalsy()
  })

  it('skybox, if present, must be a number', () => {
    expect(
      WorldConfiguration.validate({
        ...worldConfiguration,
        skybox: '233'
      })
    ).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/skybox',
        message: 'must be number'
      }
    ])
  })

  it('minimapVisible, if present, must be boolean', () => {
    expect(
      WorldConfiguration.validate({
        ...worldConfiguration,
        minimapVisible: '233'
      })
    ).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/minimapVisible',
        message: 'must be boolean'
      }
    ])
  })

  it('fixedAdapter, if present, must be a string', () => {
    expect(
      WorldConfiguration.validate({
        ...worldConfiguration,
        fixedAdapter: 233
      })
    ).toBeFalsy()
    expect(WorldConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/fixedAdapter',
        message: 'must be string'
      }
    ])
  })
})
