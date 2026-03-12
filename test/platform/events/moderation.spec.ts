import expect from 'expect'
import { Events, UserBanCreatedEvent, UserWarningCreatedEvent } from '../../../src'

describe('when validating UserBanCreatedEvent', () => {
  describe('and all required fields are present with a temporary ban', () => {
    let event: UserBanCreatedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'ban-123',
          bannedAddress: '0xbanned',
          bannedBy: '0xmoderator',
          reason: 'harassment',
          bannedAt: 1710000000000,
          expiresAt: 1710086400000,
          customMessage: 'You have been banned for 1 day.'
        }
      }
    })

    it('should pass validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and expiresAt is null (permanent ban)', () => {
    let event: UserBanCreatedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'ban-456',
          bannedAddress: '0xbanned',
          bannedBy: '0xmoderator',
          reason: 'spam',
          bannedAt: 1710000000000,
          expiresAt: null
        }
      }
    })

    it('should pass validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and customMessage is omitted', () => {
    let event: UserBanCreatedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'ban-789',
          bannedAddress: '0xbanned',
          bannedBy: '0xmoderator',
          reason: 'spam',
          bannedAt: 1710000000000,
          expiresAt: 1710086400000
        }
      }
    })

    it('should pass validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the input is null', () => {
    it('should fail validation', () => {
      expect(UserBanCreatedEvent.validate(null)).toEqual(false)
    })
  })

  describe('and the input is an empty object', () => {
    it('should fail validation', () => {
      expect(UserBanCreatedEvent.validate({})).toEqual(false)
    })
  })

  describe('and id is missing from metadata', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          bannedAddress: '0xbanned',
          bannedBy: '0xmoderator',
          reason: 'spam',
          bannedAt: 1710000000000,
          expiresAt: null
        }
      }
    })

    it('should fail validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(false)
    })
  })

  describe('and bannedAddress is missing from metadata', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'ban-123',
          bannedBy: '0xmoderator',
          reason: 'spam',
          bannedAt: 1710000000000,
          expiresAt: null
        }
      }
    })

    it('should fail validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(false)
    })
  })

  describe('and expiresAt is missing from metadata', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'ban-123',
          bannedAddress: '0xbanned',
          bannedBy: '0xmoderator',
          reason: 'spam',
          bannedAt: 1710000000000
        }
      }
    })

    it('should fail validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(false)
    })
  })

  describe('and metadata is missing entirely', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_BAN_CREATED,
        key: 'key',
        timestamp: 1
      }
    })

    it('should fail validation', () => {
      expect(UserBanCreatedEvent.validate(event)).toEqual(false)
    })
  })
})

describe('when validating UserWarningCreatedEvent', () => {
  describe('and all required fields are present', () => {
    let event: UserWarningCreatedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_WARNING_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'warn-123',
          warnedAddress: '0xwarned',
          warnedBy: '0xmoderator',
          reason: 'inappropriate language',
          customMessage: 'Please follow community guidelines.'
        }
      }
    })

    it('should pass validation', () => {
      expect(UserWarningCreatedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and customMessage is omitted', () => {
    let event: UserWarningCreatedEvent

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_WARNING_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'warn-456',
          warnedAddress: '0xwarned',
          warnedBy: '0xmoderator',
          reason: 'inappropriate language'
        }
      }
    })

    it('should pass validation', () => {
      expect(UserWarningCreatedEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the input is null', () => {
    it('should fail validation', () => {
      expect(UserWarningCreatedEvent.validate(null)).toEqual(false)
    })
  })

  describe('and the input is an empty object', () => {
    it('should fail validation', () => {
      expect(UserWarningCreatedEvent.validate({})).toEqual(false)
    })
  })

  describe('and id is missing from metadata', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_WARNING_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          warnedAddress: '0xwarned',
          warnedBy: '0xmoderator',
          reason: 'spam'
        }
      }
    })

    it('should fail validation', () => {
      expect(UserWarningCreatedEvent.validate(event)).toEqual(false)
    })
  })

  describe('and warnedAddress is missing from metadata', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_WARNING_CREATED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'warn-123',
          warnedBy: '0xmoderator',
          reason: 'spam'
        }
      }
    })

    it('should fail validation', () => {
      expect(UserWarningCreatedEvent.validate(event)).toEqual(false)
    })
  })

  describe('and metadata is missing entirely', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.MODERATION,
        subType: Events.SubType.Moderation.USER_WARNING_CREATED,
        key: 'key',
        timestamp: 1
      }
    })

    it('should fail validation', () => {
      expect(UserWarningCreatedEvent.validate(event)).toEqual(false)
    })
  })
})
