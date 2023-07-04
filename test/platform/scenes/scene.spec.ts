import expect from 'expect'
import { Scene } from '../../../src'
import { testTypeSignature } from '../../test-utils'

const setScene = (scene: Scene, props: any): Scene => ({ ...scene, ...props })

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

  it('test isPortableExperience field', () => {
    expect(Scene.validate(setScene(scene, { isPortableExperience: true }))).toEqual(true)
    expect(Scene.validate(setScene(scene, { isPortableExperience: false }))).toEqual(true)
    expect(Scene.validate(setScene(scene, { isPortableExperience: 'false' }))).toEqual(false)
  })
})
