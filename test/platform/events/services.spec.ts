import { expect } from 'expect'
import {
  EventType,
  EventSubTypeSocialService,
  FriendshipRequestEvent,
  FriendshipAcceptedEvent,
  friendshipAcceptedEventSchema,
  friendshipRequestEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateFriendshipAcceptedEvent = generateLazyValidator(friendshipAcceptedEventSchema)
const validateFriendshipRequestEvent = generateLazyValidator(friendshipRequestEventSchema)

describe('Services tests', () => {
  it('FriendshipRequestEvent static tests must pass', () => {
    const event: FriendshipRequestEvent = {
      type: EventType.SOCIAL_SERVICE,
      subType: EventSubTypeSocialService.FRIENDSHIP_REQUEST,
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

    expect(validateFriendshipRequestEvent(event)).toEqual(true)
    expect(validateFriendshipRequestEvent(null)).toEqual(false)
    expect(validateFriendshipRequestEvent({})).toEqual(false)
  })

  it('FriendshipAcceptedEvent static tests must pass', () => {
    const event: FriendshipAcceptedEvent = {
      type: EventType.SOCIAL_SERVICE,
      subType: EventSubTypeSocialService.FRIENDSHIP_ACCEPTED,
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

    expect(validateFriendshipAcceptedEvent(event)).toEqual(true)
    expect(validateFriendshipAcceptedEvent(null)).toEqual(false)
    expect(validateFriendshipAcceptedEvent({})).toEqual(false)
  })
})
