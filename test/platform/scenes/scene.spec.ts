import { expect } from 'expect'
import type { Scene } from '../../../src'
import { sceneSchema } from '../../../src'
import { RequiredPermission } from '../../../src/platform/scene/scene'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateScene = generateLazyValidator(sceneSchema)

const setScene = (scene: Scene, props: any): Scene => ({ ...scene, ...props })

describe('Scene tests', () => {
  const scene: Scene = {
    main: 'bin/main.js',
    scene: {
      base: '0,0',
      parcels: ['0,0']
    }
  }

  testTypeSignature({ schema: sceneSchema }, scene)

  it('static tests must pass', () => {
    expect(validateScene(scene)).toEqual(true)
    expect(validateScene(null)).toEqual(false)
    expect(validateScene({})).toEqual(false)
  })

  it('when main is an empty text, fails', () => {
    expect(
      validateScene({
        ...scene,
        main: ''
      })
    ).toEqual(false)
  })

  it('empty tag fails', () => {
    expect(
      validateScene({
        ...scene,
        tags: ['']
      })
    ).toEqual(false)
  })

  it('test isPortableExperience field', () => {
    expect(validateScene(setScene(scene, { isPortableExperience: true }))).toEqual(true)
    expect(validateScene(setScene(scene, { isPortableExperience: false }))).toEqual(true)
    expect(validateScene(setScene(scene, { isPortableExperience: 'false' }))).toEqual(false)
  })

  describe('test requiredPermissions field', () => {
    const aRequiredPermission = RequiredPermission.ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE
    const anotherRequiredPermission = RequiredPermission.USE_WEB3_API

    const validateRequiredPermissions = (requiredPermissions?: (RequiredPermission | string | number)[]) =>
      validateScene(setScene(scene, { requiredPermissions }))

    it('should return true when the required permissions are not defined', () => {
      expect(validateRequiredPermissions()).toEqual(true)
    })

    it('should return true when the scene does not require permissions', () => {
      expect(validateRequiredPermissions([])).toEqual(true)
    })

    it('should return true when there is only one correct required permissions', () => {
      expect(validateRequiredPermissions([aRequiredPermission])).toEqual(true)
    })

    it('should return false when there is an incorrect required permission like an empty string', () => {
      expect(validateRequiredPermissions([aRequiredPermission, ''])).toEqual(false)
    })

    it('should return false when there is an incorrect required permission like a number', () => {
      expect(validateRequiredPermissions([aRequiredPermission, 1])).toEqual(false)
    })

    it('should return false when there is a duplicated permission', () => {
      expect(validateRequiredPermissions([aRequiredPermission, aRequiredPermission])).toEqual(false)
    })

    it('should return true when there are more than 1 permission and they are different', () => {
      expect(validateRequiredPermissions([aRequiredPermission, anotherRequiredPermission])).toEqual(true)
    })

    it('should return false if the ALLOW_MEDIA_HOSTNAMES is one of the required permissions required and the allowedMediaHostnames property is undefined', () => {
      expect(validateRequiredPermissions([RequiredPermission.ALLOW_MEDIA_HOSTNAMES])).toEqual(false)
    })

    it('should return false if the ALLOW_MEDIA_HOSTNAMES is one of the required permissions and the allowedMediaHostnames is null', () => {
      expect(
        validateScene(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.ALLOW_MEDIA_HOSTNAMES],
            allowedMediaHostnames: null
          })
        )
      ).toEqual(false)
    })

    it('should return false if the ALLOW_MEDIA_HOSTNAMES is one of the required permissions and the allowedMediaHostnames is an empty array', () => {
      expect(
        validateScene(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.ALLOW_MEDIA_HOSTNAMES],
            allowedMediaHostnames: []
          })
        )
      ).toEqual(false)
    })

    it('should return false if the ALLOW_MEDIA_HOSTNAMES is not one of the required permissions and the allowedMediaHostnames is not empty or null', () => {
      expect(
        validateScene(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.USE_WEB3_API],
            allowedMediaHostnames: ['example.xyz']
          })
        )
      ).toEqual(false)
    })

    it('should return true if the ALLOW_MEDIA_HOSTNAMES is one of the required permissions and the allowedMediaHostnames property is correctly set', () => {
      expect(
        validateScene(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.ALLOW_MEDIA_HOSTNAMES],
            allowedMediaHostnames: ['example.xyz']
          })
        )
      ).toEqual(true)
    })
  })

  describe('test creator field', () => {
    it('should return true when creator is not defined', () => {
      expect(validateScene(scene)).toEqual(true)
    })

    it('should return true when creator is null', () => {
      expect(validateScene(setScene(scene, { creator: null }))).toEqual(true)
    })

    it('should return true when creator is an empty string', () => {
      expect(validateScene(setScene(scene, { creator: '' }))).toEqual(true)
    })

    it('should return true when creator is a valid Ethereum address', () => {
      expect(validateScene(setScene(scene, { creator: '0x71c7656ec7ab88b098defb751b7401b5f6d8976f' }))).toEqual(true)
    })

    it('should return false when creator is a whitespace string', () => {
      expect(validateScene(setScene(scene, { creator: ' ' }))).toEqual(false)
    })

    it('should return false when creator is an invalid Ethereum address', () => {
      expect(validateScene(setScene(scene, { creator: 'invalid-address' }))).toEqual(false)
    })
  })
})
