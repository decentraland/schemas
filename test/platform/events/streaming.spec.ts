import expect from 'expect'
import {
  StreamingKeyResetEvent,
  StreamingKeyRevokeEvent,
  StreamingKeyExpiredEvent,
  StreamingTimeExceededEvent,
  StreamingPlaceUpdatedEvent,
  Events
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
          position: '0,0',
          worldName: 'world-name',
          host: 'host-name'
        }
      }

      expect(eventClass.validate(event)).toEqual(true)
      expect(eventClass.validate(null)).toEqual(false)
      expect(eventClass.validate({})).toEqual(false)
    })
  })
})
