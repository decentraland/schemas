import { expect } from 'expect'
import type { WorldConfiguration } from '../../../src'
import { worldConfigurationSchema } from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateWorldConfiguration = generateLazyValidator(worldConfigurationSchema)

describe('World Configuration tests', () => {
  const worldConfiguration: WorldConfiguration = {
    name: 'some-name.dcl.eth'
  }

  it('type has a "schema" object', () => {
    expect(typeof worldConfigurationSchema).toEqual('object')
  })

  it('evaluate a valid example', () => {
    expect(validateWorldConfiguration(worldConfiguration)).toEqual(true)
  })

  it('static tests must pass', () => {
    expect(validateWorldConfiguration(worldConfiguration)).toBeTruthy()
    expect(validateWorldConfiguration({})).toBeTruthy()
    expect(validateWorldConfiguration(null)).toBeFalsy()
    expect(validateWorldConfiguration.errors).toEqual([
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
    expect(validateWorldConfiguration({ name: 20 })).toBeFalsy()
  })

  it('skybox, if present, must be a number', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        skybox: '233'
      })
    ).toBeFalsy()
    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/skybox',
        message: 'must be number'
      }
    ])
  })

  it('minimapVisible, if present, must be boolean', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        minimapVisible: '233'
      })
    ).toBeFalsy()
    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/minimapVisible',
        message: 'must be boolean'
      }
    ])
  })

  it('fixedAdapter, if present, must be a string', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        fixedAdapter: 233
      })
    ).toBeFalsy()
    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/fixedAdapter',
        message: 'must be string'
      }
    ])
  })

  it('miniMapConfig.dataImage, if present, must be a string', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        miniMapConfig: {
          ...worldConfiguration.miniMapConfig,
          dataImage: 233
        }
      })
    ).toBeFalsy()
    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/miniMapConfig/dataImage',
        message: 'must be string'
      }
    ])
  })

  it('miniMapConfig.estateImage, if present, must be a string', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        miniMapConfig: {
          ...worldConfiguration.miniMapConfig,
          estateImage: 233
        }
      })
    ).toBeFalsy()
    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/miniMapConfig/estateImage',
        message: 'must be string'
      }
    ])
  })

  it('placesConfig.optOut, if present, must be boolean', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        placesConfig: { optOut: 233 }
      })
    ).toBeFalsy()
    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/placesConfig/optOut',
        message: 'must be boolean'
      }
    ])
  })
  it('skyboxConfig.textures must be valid', () => {
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        skyboxConfig: {
          textures: []
        }
      })
    ).toBeTruthy()
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        customSkybox: ['1-string']
      })
    ).toBeTruthy()
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        skyboxConfig: {
          textures: ['1-string', '2-string', '3-string', '4-string', '5-string', '6-string']
        }
      })
    ).toBeTruthy()
    expect(
      validateWorldConfiguration({
        ...worldConfiguration,
        skyboxConfig: {
          textures: ['1-string', '2-string', '3-string', '4-string', '5-string']
        }
      })
    ).toBeFalsy()

    expect(validateWorldConfiguration.errors).toMatchObject([
      {
        instancePath: '/skyboxConfig/textures',
        message: 'customSkybox must be an array of 0, 1 or 6 strings'
      }
    ])
  })
})
