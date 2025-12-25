import expect from 'expect'
import {
  UserJoinedRoomEvent,
  Events,
  UserBannedFromSceneEvent,
  UserUnbannedFromSceneEvent,
  RoomType
} from '../../../src'

describe('Comms Events tests', () => {
  it('UserJoinedRoomEvent static tests must pass', () => {
    const event: UserJoinedRoomEvent = {
      type: Events.Type.COMMS,
      subType: Events.SubType.Comms.USER_JOINED_ROOM,
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

    expect(UserJoinedRoomEvent.validate(event)).toEqual(true)
    expect(UserJoinedRoomEvent.validate(null)).toEqual(false)
    expect(UserJoinedRoomEvent.validate({})).toEqual(false)
  })

  it('UserJoinedRoomEvent should fail with missing required metadata fields', () => {
    const event: any = {
      type: Events.Type.COMMS,
      subType: Events.SubType.Comms.USER_JOINED_ROOM,
      key: 'key',
      timestamp: 1,
      metadata: {
        parcel: '0,0',
        sceneId: 'scene-id',
        userAddress: '0x123'
        // realmName and isWorld missing
      }
    }

    expect(UserJoinedRoomEvent.validate(event)).toEqual(false)
  })

  describe('UserBannedFromSceneEvent', () => {
    it('should pass validation with valid data', () => {
      const event: UserBannedFromSceneEvent = {
        type: Events.Type.COMMS,
        subType: Events.SubType.Comms.USER_BANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1,
        metadata: {
          placeTitle: 'place-title',
          userAddress: '0x123'
        }
      }

      expect(UserBannedFromSceneEvent.validate(event)).toEqual(true)
      expect(UserBannedFromSceneEvent.validate(null)).toEqual(false)
      expect(UserBannedFromSceneEvent.validate({})).toEqual(false)
    })

    it('should fail with missing required metadata fields', () => {
      const event: any = {
        type: Events.Type.COMMS,
        subType: Events.SubType.Comms.USER_BANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1
      }

      expect(UserBannedFromSceneEvent.validate(event)).toEqual(false)
    })
  })

  describe('UserUnbannedFromSceneEvent', () => {
    it('should pass validation with valid data', () => {
      const event: UserUnbannedFromSceneEvent = {
        type: Events.Type.COMMS,
        subType: Events.SubType.Comms.USER_UNBANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1,
        metadata: {
          placeTitle: 'place-title',
          userAddress: '0x123'
        }
      }

      expect(UserUnbannedFromSceneEvent.validate(event)).toEqual(true)
      expect(UserUnbannedFromSceneEvent.validate(null)).toEqual(false)
      expect(UserUnbannedFromSceneEvent.validate({})).toEqual(false)
    })

    it('should fail with missing required metadata fields', () => {
      const event: any = {
        type: Events.Type.COMMS,
        subType: Events.SubType.Comms.USER_UNBANNED_FROM_SCENE,
        key: 'key',
        timestamp: 1
      }

      expect(UserUnbannedFromSceneEvent.validate(event)).toEqual(false)
    })
  })
})
