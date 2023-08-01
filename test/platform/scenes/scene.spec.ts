import expect from 'expect'
import { Scene } from '../../../src'
import { RequiredPermission } from '../../../src/platform/scene/scene'
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

  describe('test requiredPermissions field', () => {
    const aRequiredPermission = RequiredPermission.ALLOW_TO_MOVE_PLAYER_INSIDE_SCENE
    const anotherRequiredPermission = RequiredPermission.USE_WEB3_API

    const validateRequiredPermissions = (requiredPermissions?: (RequiredPermission | string | number)[]) =>
      Scene.validate(setScene(scene, { requiredPermissions }))

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
        Scene.validate(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.ALLOW_MEDIA_HOSTNAMES],
            allowedMediaHostnames: null
          })
        )
      ).toEqual(false)
    })

    it('should return false if the ALLOW_MEDIA_HOSTNAMES is one of the required permissions and the allowedMediaHostnames is an empty array', () => {
      expect(
        Scene.validate(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.ALLOW_MEDIA_HOSTNAMES],
            allowedMediaHostnames: []
          })
        )
      ).toEqual(false)
    })

    it('should return false if the ALLOW_MEDIA_HOSTNAMES is not one of the required permissions and the allowedMediaHostnames is not empty or null', () => {
      expect(
        Scene.validate(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.USE_WEB3_API],
            allowedMediaHostnames: ['example.xyz']
          })
        )
      ).toEqual(false)
    })

    it('should return true if the ALLOW_MEDIA_HOSTNAMES is one of the required permissions and the allowedMediaHostnames property is correctly set', () => {
      expect(
        Scene.validate(
          setScene(scene, {
            requiredPermissions: [RequiredPermission.ALLOW_MEDIA_HOSTNAMES],
            allowedMediaHostnames: ['example.xyz']
          })
        )
      ).toEqual(true)
    })
  })
})
