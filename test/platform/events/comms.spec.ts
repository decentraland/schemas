import expect from 'expect'
import { UserJoinedRoomEvent, Events } from '../../../src'

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
        isWorld: false
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
})
