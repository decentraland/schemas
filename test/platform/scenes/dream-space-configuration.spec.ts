import expect from 'expect'
import { validateType, DreamSpaceConfiguration } from '../../../src'

describe('DreamSpace Configuration tests', () => {
  const dreamSpaceConfiguration: DreamSpaceConfiguration = {
    name: 'some-name.dcl.eth'
  }

  it('type has a "schema" object', () => {
    expect(typeof DreamSpaceConfiguration.schema).toEqual('object')
  })

  it('type has a "validate" function', () => {
    expect(typeof DreamSpaceConfiguration.validate).toEqual('function')
  })

  it('evaluate a valid example', () => {
    expect(DreamSpaceConfiguration.validate(dreamSpaceConfiguration)).toEqual(true)
    expect(validateType(DreamSpaceConfiguration, dreamSpaceConfiguration)).toEqual(true)
  })

  it('static tests must pass', () => {
    expect(DreamSpaceConfiguration.validate(dreamSpaceConfiguration)).toBeTruthy()
    expect(DreamSpaceConfiguration.validate({})).toBeTruthy()
    expect(DreamSpaceConfiguration.validate(null)).toBeFalsy()
    expect(DreamSpaceConfiguration.validate.errors).toEqual([
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
    expect(DreamSpaceConfiguration.validate({ name: 20 })).toBeFalsy()
  })

  it('fixedAdapter, if present, must be a string', () => {
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        fixedAdapter: 233
      })
    ).toBeFalsy()
    expect(DreamSpaceConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/fixedAdapter',
        message: 'must be string'
      }
    ])
  })

  it('miniMapConfig.dataImage, if present, must be a string', () => {
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        miniMapConfig: {
          ...dreamSpaceConfiguration.miniMapConfig,
          dataImage: 233
        }
      })
    ).toBeFalsy()
    expect(DreamSpaceConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/miniMapConfig/dataImage',
        message: 'must be string'
      }
    ])
  })

  it('miniMapConfig.estateImage, if present, must be a string', () => {
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        miniMapConfig: {
          ...dreamSpaceConfiguration.miniMapConfig,
          estateImage: 233
        }
      })
    ).toBeFalsy()
    expect(DreamSpaceConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/miniMapConfig/estateImage',
        message: 'must be string'
      }
    ])
  })

  it('placesConfig.optOut, if present, must be boolean', () => {
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        placesConfig: { optOut: 233 }
      })
    ).toBeFalsy()
    expect(DreamSpaceConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/placesConfig/optOut',
        message: 'must be boolean'
      }
    ])
  })
  it('skyboxConfig.textures must be valid', () => {
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        skyboxConfig: {
          textures: []
        }
      })
    ).toBeTruthy()
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        customSkybox: ['1-string']
      })
    ).toBeTruthy()
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        skyboxConfig: {
          textures: ['1-string', '2-string', '3-string', '4-string', '5-string', '6-string']
        }
      })
    ).toBeTruthy()
    expect(
      DreamSpaceConfiguration.validate({
        ...dreamSpaceConfiguration,
        skyboxConfig: {
          textures: ['1-string', '2-string', '3-string', '4-string', '5-string']
        }
      })
    ).toBeFalsy()

    expect(DreamSpaceConfiguration.validate.errors).toMatchObject([
      {
        instancePath: '/skyboxConfig/textures',
        message: 'customSkybox must be an array of 0, 1 or 6 strings'
      }
    ])
  })
})
