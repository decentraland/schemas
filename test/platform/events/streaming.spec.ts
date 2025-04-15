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
  it('StreamingKeyResetEvent static tests must pass', () => {
    const event: StreamingKeyResetEvent = {
      type: Events.Type.STREAMING,
      subType: Events.SubType.Streaming.STREAMING_KEY_RESET,
      key: 'key',
      timestamp: 1,
      metadata: {
        position: '0,0',
        worldName: 'world-name',
        host: 'host-name'
      }
    }

    expect(StreamingKeyResetEvent.validate(event)).toEqual(true)
    expect(StreamingKeyResetEvent.validate(null)).toEqual(false)
    expect(StreamingKeyResetEvent.validate({})).toEqual(false)
  })

  it('StreamingKeyRevokeEvent static tests must pass', () => {
    const event: StreamingKeyRevokeEvent = {
      type: Events.Type.STREAMING,
      subType: Events.SubType.Streaming.STREAMING_KEY_REVOKE,
      key: 'key',
      timestamp: 1,
      metadata: {
        position: '0,0',
        worldName: 'world-name',
        host: 'host-name'
      }
    }

    expect(StreamingKeyRevokeEvent.validate(event)).toEqual(true)
    expect(StreamingKeyRevokeEvent.validate(null)).toEqual(false)
    expect(StreamingKeyRevokeEvent.validate({})).toEqual(false)
  })

  it('StreamingKeyExpiredEvent static tests must pass', () => {
    const event: StreamingKeyExpiredEvent = {
      type: Events.Type.STREAMING,
      subType: Events.SubType.Streaming.STREAMING_KEY_EXPIRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        position: '0,0',
        worldName: 'world-name',
        host: 'host-name'
      }
    }

    expect(StreamingKeyExpiredEvent.validate(event)).toEqual(true)
    expect(StreamingKeyExpiredEvent.validate(null)).toEqual(false)
    expect(StreamingKeyExpiredEvent.validate({})).toEqual(false)
  })

  it('StreamingTimeExceededEvent static tests must pass', () => {
    const event: StreamingTimeExceededEvent = {
      type: Events.Type.STREAMING,
      subType: Events.SubType.Streaming.STREAMING_TIME_EXCEEDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        position: '0,0',
        worldName: 'world-name',
        host: 'host-name'
      }
    }

    expect(StreamingTimeExceededEvent.validate(event)).toEqual(true)
    expect(StreamingTimeExceededEvent.validate(null)).toEqual(false)
    expect(StreamingTimeExceededEvent.validate({})).toEqual(false)
  })

  it('StreamingPlaceUpdatedEvent static tests must pass', () => {
    const event: StreamingPlaceUpdatedEvent = {
      type: Events.Type.STREAMING,
      subType: Events.SubType.Streaming.STREAMING_PLACE_UPDATED,
      key: 'key',
      timestamp: 1,
      metadata: {
        position: '0,0',
        worldName: 'world-name',
        host: 'host-name'
      }
    }

    expect(StreamingPlaceUpdatedEvent.validate(event)).toEqual(true)
    expect(StreamingPlaceUpdatedEvent.validate(null)).toEqual(false)
    expect(StreamingPlaceUpdatedEvent.validate({})).toEqual(false)
  })
})
