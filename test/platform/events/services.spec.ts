import expect from 'expect'
import { Events, FriendshipRequestEvent, FriendshipAcceptedEvent } from '../../../src'

describe('Services tests', () => {
  it('FriendshipRequestEvent static tests must pass', () => {
    const event: FriendshipRequestEvent = {
      type: Events.Type.SOCIAL_SERVICE,
      subType: Events.SubType.SocialService.FRIENDSHIP_REQUEST,
      key: 'key',
      timestamp: 1,
      metadata: {
        requestId: 'requestId',
        sender: {
          address: '0x123sender',
          name: 'name',
          profileImageUrl: 'https://profileImageUrl.dcl.org',
          hasClaimedName: true
        },
        receiver: {
          address: '0x456receiver',
          name: 'name',
          profileImageUrl: 'https://profileImageUrl.dcl.org',
          hasClaimedName: true
        },
        message: 'message'
      }
    }

    expect(FriendshipRequestEvent.validate(event)).toEqual(true)
    expect(FriendshipRequestEvent.validate(null)).toEqual(false)
    expect(FriendshipRequestEvent.validate({})).toEqual(false)
  })

  it('FriendshipAcceptedEvent static tests must pass', () => {
    const event: FriendshipAcceptedEvent = {
      type: Events.Type.SOCIAL_SERVICE,
      subType: Events.SubType.SocialService.FRIENDSHIP_ACCEPTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        requestId: 'requestId',
        sender: {
          address: '0x123sender',
          name: 'name',
          profileImageUrl: 'https://profileImageUrl.dcl.org',
          hasClaimedName: true
        },
        receiver: {
          address: '0x456receiver',
          name: 'name',
          profileImageUrl: 'https://profileImageUrl.dcl.org',
          hasClaimedName: true
        }
      }
    }

    expect(FriendshipAcceptedEvent.validate(event)).toEqual(true)
    expect(FriendshipAcceptedEvent.validate(null)).toEqual(false)
    expect(FriendshipAcceptedEvent.validate({})).toEqual(false)
  })
})
