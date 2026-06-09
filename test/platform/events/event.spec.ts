import expect from 'expect'
import { Events, EventDeletedEvent } from '../../../src'

describe('when validating EventDeletedEvent', () => {
  describe('and all required fields are present with a reason', () => {
    let event: EventDeletedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.EVENT,
        subType: Events.SubType.Event.EVENT_DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          host: '0xhost',
          title: 'My Hangout',
          description: 'A hangout',
          image: 'https://example.com/image.jpg',
          reason: 'Removed by an administrator'
        }
      }
    })

    it('should pass validation', () => {
      expect(EventDeletedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the optional reason is omitted', () => {
    let event: EventDeletedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.EVENT,
        subType: Events.SubType.Event.EVENT_DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          host: '0xhost',
          title: 'My Hangout',
          description: 'A hangout',
          image: 'https://example.com/image.jpg'
        }
      }
    })

    it('should pass validation', () => {
      expect(EventDeletedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the input is null', () => {
    it('should fail validation', () => {
      expect(EventDeletedEvent.validate(null)).toEqual(false)
    })
  })

  describe('and the input is an empty object', () => {
    it('should fail validation', () => {
      expect(EventDeletedEvent.validate({})).toEqual(false)
    })
  })

  describe('and host is missing from metadata', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.EVENT,
        subType: Events.SubType.Event.EVENT_DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          title: 'My Hangout',
          description: 'A hangout',
          image: 'https://example.com/image.jpg'
        }
      }
    })

    it('should fail validation', () => {
      expect(EventDeletedEvent.validate(event)).toEqual(false)
    })
  })

  describe('and metadata is missing entirely', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.EVENT,
        subType: Events.SubType.Event.EVENT_DELETED,
        key: 'key',
        timestamp: 1
      }
    })

    it('should fail validation', () => {
      expect(EventDeletedEvent.validate(event)).toEqual(false)
    })
  })
})
