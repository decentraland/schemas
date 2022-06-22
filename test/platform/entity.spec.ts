import expect from 'expect'
import {
  BodyShape,
  Emote,
  EmoteCategory,
  Entity,
  Locale,
  Profile,
  Rarity,
  Scene,
  Store,
  Wearable,
  WearableCategory
} from '../../src'
import {
  expectValidationFailureWithErrors,
  testTypeSignature
} from '../test-utils'
import { AVATAR } from './profiles/avatar.spec'

describe('Entity', () => {
  it('sanity', () => {
    expect(
      Entity.validate({
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      })
    ).toEqual(false)
    expect(
      Entity.validate({
        content: [],
        id: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      })
    ).toEqual(false)
    expect(
      Entity.validate({
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo-invalid',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      })
    ).toEqual(false)
  })

  it('When type is not valid, then entity validation fails', () => {
    const entityWithValidProfileMetadata = {
      content: [],
      id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
      pointers: ['asd'],
      timestamp: 1,
      type: 'invalid',
      metadata: { avatars: [AVATAR] },
      version: 'v3'
    }
    testTypeSignature(Profile, entityWithValidProfileMetadata.metadata)
    expect(Profile.validate(entityWithValidProfileMetadata.metadata)).toEqual(
      true
    )
    expectValidationFailureWithErrors(
      Entity.validate,
      entityWithValidProfileMetadata,
      ['must be equal to one of the allowed values']
    )
  })
  describe('Profile', () => {
    it('When type is profile and metadata is for profile, validation success', () => {
      const profile = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'profile',
        metadata: { avatars: [AVATAR] },
        version: 'v3'
      }
      testTypeSignature(Profile, profile.metadata)
      expect(Profile.validate(profile.metadata)).toEqual(true)
      expect(Entity.validate(profile)).toBeTruthy()
    })

    it('When type is profile and valid metadata for scene, then entity validation fails', () => {
      const profileWithSceneMetadata = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'profile',
        metadata: {
          main: 'bin/main.js',
          scene: {
            base: '0,0',
            parcels: ['0,0']
          }
        } as Scene,
        version: 'v3'
      }
      testTypeSignature(Scene, profileWithSceneMetadata.metadata)
      expect(Scene.validate(profileWithSceneMetadata.metadata)).toEqual(true)
      expectValidationFailureWithErrors(
        Entity.validate,
        profileWithSceneMetadata,
        ['metadata schema for "profile" is invalid']
      )
    })
  })

  describe('Scene', () => {
    it('When type is scene and scene metadata, validation success', () => {
      const scene = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {
          main: 'bin/main.js',
          scene: {
            base: '0,0',
            parcels: ['0,0']
          }
        } as Scene,
        version: 'v3'
      }
      testTypeSignature(Scene, scene.metadata)
      expect(Scene.validate(scene.metadata)).toEqual(true)
      expect(Entity.validate(scene)).toBeTruthy()
    })

    it('When type is scene and profile metadata, then entity validation fails', () => {
      const sceneWithProfileMetadata = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: { avatars: [AVATAR] } as Profile,
        version: 'v3'
      }
      testTypeSignature(Profile, sceneWithProfileMetadata.metadata)
      expect(Profile.validate(sceneWithProfileMetadata.metadata)).toEqual(true)
      expectValidationFailureWithErrors(
        Entity.validate,
        sceneWithProfileMetadata,
        ['metadata schema for "scene" is invalid']
      )
    })
  })

  describe('Wearable', () => {
    it('When type is wearable and wearable metadata, validation success', () => {
      const wearable = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'wearable',
        metadata: {
          id: 'some id',
          name: 'name',
          description: 'some description',
          data: {
            replaces: [],
            hides: [],
            tags: ['tag1'],
            representations: [
              {
                bodyShapes: [BodyShape.FEMALE],
                mainFile: 'file1',
                contents: ['file1', 'file2'],
                overrideHides: [],
                overrideReplaces: []
              }
            ],
            category: WearableCategory.UPPER_BODY
          },
          i18n: [
            {
              code: Locale.EN,
              text: 'some id'
            }
          ],
          thumbnail: 'thumbnail.png',
          image: 'image.png',
          collectionAddress: '0x...',
          rarity: Rarity.LEGENDARY
        } as Wearable,
        version: 'v3'
      }
      testTypeSignature(Wearable, wearable.metadata)
      expect(Wearable.validate(wearable.metadata)).toEqual(true)
      expect(Entity.validate(wearable)).toBeTruthy()
    })

    it('When type is wearable and profile metadata, then entity validation fails', () => {
      const wearableWithProfileMetadata = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'wearable',
        metadata: { avatars: [AVATAR] } as Profile,
        version: 'v3'
      }
      testTypeSignature(Profile, wearableWithProfileMetadata.metadata)
      expect(Profile.validate(wearableWithProfileMetadata.metadata)).toEqual(
        true
      )
      expectValidationFailureWithErrors(
        Entity.validate,
        wearableWithProfileMetadata,
        ['metadata schema for "wearable" is invalid']
      )
    })
  })

  describe('Store', () => {
    it('When type is store and store metadata, validation success', () => {
      const store = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'store',
        metadata: {
          id: 'urn:decentraland:marketplace:store:0xe592427a0aece92de3edee1f18e0157c05861564',
          description: 'Some store',
          owner: '0xe592427a0aece92de3edee1f18e0157c05861564',
          links: [
            {
              name: 'Discord',
              url: 'discord.com/some-store'
            }
          ],
          images: [
            {
              name: 'banner',
              file: 'banner.png'
            }
          ],
          version: 1
        } as Store,
        version: 'v3'
      }
      testTypeSignature(Store, store.metadata)
      expect(Store.validate(store.metadata)).toEqual(true)
      expect(Entity.validate(store)).toBeTruthy()
    })

    it('When type is store and profile metadata, then entity validation fails', () => {
      const storeWithProfileMetadata = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'store',
        metadata: { avatars: [AVATAR] } as Profile,
        version: 'v3'
      }
      testTypeSignature(Profile, storeWithProfileMetadata.metadata)
      expect(Profile.validate(storeWithProfileMetadata.metadata)).toEqual(true)
      expectValidationFailureWithErrors(
        Entity.validate,
        storeWithProfileMetadata,
        ['metadata schema for "store" is invalid']
      )
    })
  })

  describe('Emote', () => {
    it('When type is emote and emote metadata, validation success', () => {
      const emote = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'emote',
        metadata: {
          id: 'some id',
          name: 'name',
          description: 'some description',
          i18n: [
            {
              code: Locale.EN,
              text: 'some id'
            }
          ],
          thumbnail: 'thumbnail.png',
          image: 'image.png',
          collectionAddress: '0x...',
          rarity: Rarity.LEGENDARY,
          emoteDataADR74: {
            category: EmoteCategory.LOOP,
            representations: [
              {
                bodyShapes: [BodyShape.FEMALE],
                mainFile: 'file1',
                contents: ['file1', 'file2']
              }
            ],
            tags: ['tag1']
          }
        } as Emote,
        version: 'v3'
      }
      testTypeSignature(Emote, emote.metadata)
      expect(Emote.validate(emote.metadata)).toEqual(true)
      expect(Entity.validate(emote)).toBeTruthy()
    })

    it('When type is emote and profile metadata, then entity validation fails', () => {
      const emoteWithProfileMetadata = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'emote',
        metadata: { avatars: [AVATAR] } as Profile,
        version: 'v3'
      }
      testTypeSignature(Profile, emoteWithProfileMetadata.metadata)
      expect(Profile.validate(emoteWithProfileMetadata.metadata)).toEqual(true)
      expectValidationFailureWithErrors(
        Entity.validate,
        emoteWithProfileMetadata,
        ['metadata schema for "emote" is invalid']
      )
    })
  })
})
