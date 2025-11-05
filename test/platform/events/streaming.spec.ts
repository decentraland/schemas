import expect from 'expect'
import {
  StreamingKeyResetEvent,
  StreamingKeyRevokeEvent,
  StreamingKeyExpiredEvent,
  StreamingTimeExceededEvent,
  StreamingPlaceUpdatedEvent,
  Events,
  CommunityStreamingEndedEvent
} from '../../../src'

describe('Streaming Events tests', () => {
  const testCases = [
    {
      name: 'StreamingKeyResetEvent',
      eventClass: StreamingKeyResetEvent,
      subType: Events.SubType.Streaming.STREAMING_KEY_RESET
    },
    {
      name: 'StreamingKeyRevokeEvent',
      eventClass: StreamingKeyRevokeEvent,
      subType: Events.SubType.Streaming.STREAMING_KEY_REVOKE
    },
    {
      name: 'StreamingKeyExpiredEvent',
      eventClass: StreamingKeyExpiredEvent,
      subType: Events.SubType.Streaming.STREAMING_KEY_EXPIRED
    },
    {
      name: 'StreamingTimeExceededEvent',
      eventClass: StreamingTimeExceededEvent,
      subType: Events.SubType.Streaming.STREAMING_TIME_EXCEEDED
    },
    {
      name: 'StreamingPlaceUpdatedEvent',
      eventClass: StreamingPlaceUpdatedEvent,
      subType: Events.SubType.Streaming.STREAMING_PLACE_UPDATED
    }
  ]

  testCases.forEach(({ name, eventClass, subType }) => {
    it(`${name} static tests must pass`, () => {
      const event = {
        type: Events.Type.STREAMING,
        subType,
        key: 'key',
        timestamp: 1,
        metadata: {
          title: 'Test Title',
          description: 'Test Description',
          position: '0,0',
          worldName: null,
          url: 'https://test.com',
          isWorld: true,
          address: '0x123',
          image: 'https://test.com/image.png'
        }
      }

      expect(eventClass.validate(event)).toEqual(true)
      expect(eventClass.validate(null)).toEqual(false)
      expect(eventClass.validate({})).toEqual(false)
    })
  })

  it('CommunityStreamingEndedEvent static tests must pass', () => {
    const event: CommunityStreamingEndedEvent = {
      type: Events.Type.STREAMING,
      subType: Events.SubType.Streaming.COMMUNITY_STREAMING_ENDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        totalParticipants: 10
      }
    }

    expect(CommunityStreamingEndedEvent.validate(event)).toEqual(true)
    expect(CommunityStreamingEndedEvent.validate(null)).toEqual(false)
    expect(CommunityStreamingEndedEvent.validate({})).toEqual(false)
  })
})
