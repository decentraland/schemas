import { expect } from 'expect'
import {
  UserJoinedRoomEvent,
  EventType,
  EventSubTypeComms,
  UserBannedFromSceneEvent,
  UserUnbannedFromSceneEvent,
  RoomType,
  userBannedFromSceneEventSchema,
  userJoinedRoomEventSchema,
  userUnbannedFromSceneEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateUserBannedFromSceneEvent = generateLazyValidator(userBannedFromSceneEventSchema)
const validateUserJoinedRoomEvent = generateLazyValidator(userJoinedRoomEventSchema)
const validateUserUnbannedFromSceneEvent = generateLazyValidator(userUnbannedFromSceneEventSchema)

describe('Comms Events tests', () => {
  it('UserJoinedRoomEvent static tests must pass', () => {
    const event: UserJoinedRoomEvent = {
      type: EventType.COMMS,
      subType: EventSubTypeComms.USER_JOINED_ROOM,
      key: 'key',
      timestamp: 1,
      metadata: {
        parcel: '0,0',
        sceneId: 'scene-id',
        userAddress: '0x123',
        realmName: 'realm-name',
        isWorld: false,
        roomType: RoomType.PRIVATE_MESSAGE
      }
    }

    expect(validateUserJoinedRoomEvent(event)).toEqual(true)
    expect(validateUserJoinedRoomEvent(null)).toEqual(false)
    expect(validateUserJoinedRoomEvent({})).toEqual(false)
  })

  it('UserJoinedRoomEvent should fail with missing required metadata fields', () => {
    const event: any = {
      type: EventType.COMMS,
      subType: EventSubTypeComms.USER_JOINED_ROOM,
      key: 'key',
      timestamp: 1,
      metadata: {
        parcel: '0,0',
        sceneId: 'scene-id',
        userAddress: '0x123'
        // realmName and isWorld missing
      }
    }

    expect(validateUserJoinedRoomEvent(event)).toEqual(false)
  })

  describe('UserBannedFromSceneEvent', () => {
    it('should pass validation with valid data', () => {
      const event: UserBannedFromSceneEvent = {
        type: EventType.COMMS,
        subType: EventSubTypeComms.USER_BANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1,
        metadata: {
          placeTitle: 'place-title',
          userAddress: '0x123'
        }
      }

      expect(validateUserBannedFromSceneEvent(event)).toEqual(true)
      expect(validateUserBannedFromSceneEvent(null)).toEqual(false)
      expect(validateUserBannedFromSceneEvent({})).toEqual(false)
    })

    it('should fail with missing required metadata fields', () => {
      const event: any = {
        type: EventType.COMMS,
        subType: EventSubTypeComms.USER_BANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1
      }

      expect(validateUserBannedFromSceneEvent(event)).toEqual(false)
    })
  })

  describe('UserUnbannedFromSceneEvent', () => {
    it('should pass validation with valid data', () => {
      const event: UserUnbannedFromSceneEvent = {
        type: EventType.COMMS,
        subType: EventSubTypeComms.USER_UNBANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1,
        metadata: {
          placeTitle: 'place-title',
          userAddress: '0x123'
        }
      }

      expect(validateUserUnbannedFromSceneEvent(event)).toEqual(true)
      expect(validateUserUnbannedFromSceneEvent(null)).toEqual(false)
      expect(validateUserUnbannedFromSceneEvent({})).toEqual(false)
    })

    it('should fail with missing required metadata fields', () => {
      const event: any = {
        type: EventType.COMMS,
        subType: EventSubTypeComms.USER_UNBANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1
      }

      expect(validateUserUnbannedFromSceneEvent(event)).toEqual(false)
    })
  })
})
