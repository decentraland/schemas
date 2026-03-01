import { expect } from 'expect'
import {
  EventType,
  EventSubTypeStreaming,
  CommunityStreamingEndedEvent,
  streamingKeyResetEventSchema,
  streamingKeyRevokeEventSchema,
  streamingKeyExpiredEventSchema,
  streamingTimeExceededEventSchema,
  streamingPlaceUpdatedEventSchema,
  communityStreamingEndedEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateCommunityStreamingEndedEvent = generateLazyValidator(communityStreamingEndedEventSchema)

describe('Streaming Events tests', () => {
  const testCases = [
    {
      name: 'StreamingKeyResetEvent',
      eventSchema: streamingKeyResetEventSchema,
      subType: EventSubTypeStreaming.STREAMING_KEY_RESET
    },
    {
      name: 'StreamingKeyRevokeEvent',
      eventSchema: streamingKeyRevokeEventSchema,
      subType: EventSubTypeStreaming.STREAMING_KEY_REVOKE
    },
    {
      name: 'StreamingKeyExpiredEvent',
      eventSchema: streamingKeyExpiredEventSchema,
      subType: EventSubTypeStreaming.STREAMING_KEY_EXPIRED
    },
    {
      name: 'StreamingTimeExceededEvent',
      eventSchema: streamingTimeExceededEventSchema,
      subType: EventSubTypeStreaming.STREAMING_TIME_EXCEEDED
    },
    {
      name: 'StreamingPlaceUpdatedEvent',
      eventSchema: streamingPlaceUpdatedEventSchema,
      subType: EventSubTypeStreaming.STREAMING_PLACE_UPDATED
    }
  ]

  testCases.forEach(({ name, eventSchema, subType }) => {
    it(`${name} static tests must pass`, () => {
      const validate = generateLazyValidator(eventSchema)
      const event = {
        type: EventType.STREAMING,
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

      expect(validate(event)).toEqual(true)
      expect(validate(null)).toEqual(false)
      expect(validate({})).toEqual(false)
    })
  })

  it('CommunityStreamingEndedEvent static tests must pass', () => {
    const event: CommunityStreamingEndedEvent = {
      type: EventType.STREAMING,
      subType: EventSubTypeStreaming.COMMUNITY_STREAMING_ENDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        totalParticipants: 10
      }
    }

    expect(validateCommunityStreamingEndedEvent(event)).toEqual(true)
    expect(validateCommunityStreamingEndedEvent(null)).toEqual(false)
    expect(validateCommunityStreamingEndedEvent({})).toEqual(false)
  })
})
