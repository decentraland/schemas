import expect from 'expect'
import {
  CommunityDeletedEvent,
  CommunityRenamedEvent,
  CommunityMemberBannedEvent,
  CommunityMemberRemovedEvent,
  Events,
  CommunityDeletedContentViolationEvent
} from '../../../src'

describe('Community Events tests', () => {
  describe('CommunityDeletedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityDeletedEvent = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddresses: ['0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedEvent.validate(event)).toEqual(true)
      expect(CommunityDeletedEvent.validate(null)).toEqual(false)
      expect(CommunityDeletedEvent.validate({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing memberAddresses', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddresses: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(CommunityDeletedEvent.validate(event)).toEqual(false)
    })
  })

  describe('CommunityDeletedContentViolationEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityDeletedContentViolationEvent = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedContentViolationEvent.validate(event)).toEqual(true)
      expect(CommunityDeletedContentViolationEvent.validate(null)).toEqual(false)
      expect(CommunityDeletedContentViolationEvent.validate({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedContentViolationEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedContentViolationEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing ownerAddress', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityDeletedContentViolationEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          ownerAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(CommunityDeletedContentViolationEvent.validate(event)).toEqual(false)
    })
  })

  describe('CommunityRenamedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityRenamedEvent = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityRenamedEvent.validate(event)).toEqual(true)
      expect(CommunityRenamedEvent.validate(null)).toEqual(false)
      expect(CommunityRenamedEvent.validate({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityRenamedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing oldName', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityRenamedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing newName', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityRenamedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing memberAddresses', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityRenamedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(CommunityRenamedEvent.validate(event)).toEqual(false)
    })
  })

  describe('CommunityMemberBannedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityMemberBannedEvent = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberBannedEvent.validate(event)).toEqual(true)
      expect(CommunityMemberBannedEvent.validate(null)).toEqual(false)
      expect(CommunityMemberBannedEvent.validate({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberBannedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberBannedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberBannedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(CommunityMemberBannedEvent.validate(event)).toEqual(false)
    })
  })

  describe('CommunityMemberRemovedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityMemberRemovedEvent = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberRemovedEvent.validate(event)).toEqual(true)
      expect(CommunityMemberRemovedEvent.validate(null)).toEqual(false)
      expect(CommunityMemberRemovedEvent.validate({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberRemovedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberRemovedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(CommunityMemberRemovedEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: Events.Type.COMMUNITY,
        subType: Events.SubType.Community.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(CommunityMemberRemovedEvent.validate(event)).toEqual(false)
    })
  })
})
