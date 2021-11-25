import expect from 'expect'
import { Scene } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Scene tests', () => {
  const scene: Scene = {
    main: 'bin/main.js',
    scene: {
      base: '0,0',
      parcels: ['0,0']
    }
  }

  testTypeSignature(Scene, scene)

  it('static tests must pass', () => {
    expect(Scene.validate(scene)).toEqual(true)
    expect(Scene.validate(null)).toEqual(false)
    expect(Scene.validate({})).toEqual(false)
  })

  it('when main is an empty text, fails', () => {
    expect(
      Scene.validate({
        ...scene,
        main: ''
      })
    ).toEqual(false)
  })

  it('empty tag fails', () => {
    expect(
      Scene.validate({
        ...scene,
        tags: ['']
      })
    ).toEqual(false)
  })
})
