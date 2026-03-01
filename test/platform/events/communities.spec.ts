import { expect } from 'expect'
import {
  CommunityDeletedEvent,
  CommunityRenamedEvent,
  CommunityMemberBannedEvent,
  CommunityMemberLeftEvent,
  CommunityMemberRemovedEvent,
  EventType,
  EventSubTypeCommunity,
  CommunityDeletedContentViolationEvent,
  CommunityRequestToJoinReceivedEvent,
  CommunityRequestToJoinAcceptedEvent,
  CommunityInviteReceivedEvent,
  CommunityOwnershipTransferredEvent,
  CommunityPostAddedEvent,
  CommunityVoiceChatStartedEvent,
  communityDeletedContentViolationEventSchema,
  communityDeletedEventSchema,
  communityInviteReceivedEventSchema,
  communityMemberBannedEventSchema,
  communityMemberLeftEventSchema,
  communityMemberRemovedEventSchema,
  communityOwnershipTransferredEventSchema,
  communityPostAddedEventSchema,
  communityRenamedEventSchema,
  communityRequestToJoinAcceptedEventSchema,
  communityRequestToJoinReceivedEventSchema,
  communityVoiceChatStartedEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateCommunityDeletedContentViolationEvent = generateLazyValidator(communityDeletedContentViolationEventSchema)
const validateCommunityDeletedEvent = generateLazyValidator(communityDeletedEventSchema)
const validateCommunityInviteReceivedEvent = generateLazyValidator(communityInviteReceivedEventSchema)
const validateCommunityMemberBannedEvent = generateLazyValidator(communityMemberBannedEventSchema)
const validateCommunityMemberLeftEvent = generateLazyValidator(communityMemberLeftEventSchema)
const validateCommunityMemberRemovedEvent = generateLazyValidator(communityMemberRemovedEventSchema)
const validateCommunityOwnershipTransferredEvent = generateLazyValidator(communityOwnershipTransferredEventSchema)
const validateCommunityPostAddedEvent = generateLazyValidator(communityPostAddedEventSchema)
const validateCommunityRenamedEvent = generateLazyValidator(communityRenamedEventSchema)
const validateCommunityRequestToJoinAcceptedEvent = generateLazyValidator(communityRequestToJoinAcceptedEventSchema)
const validateCommunityRequestToJoinReceivedEvent = generateLazyValidator(communityRequestToJoinReceivedEventSchema)
const validateCommunityVoiceChatStartedEvent = generateLazyValidator(communityVoiceChatStartedEventSchema)

describe('Community Events tests', () => {
  describe('CommunityDeletedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityDeletedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddresses: ['0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedEvent(event)).toEqual(true)
      expect(validateCommunityDeletedEvent(null)).toEqual(false)
      expect(validateCommunityDeletedEvent({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedEvent(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddresses', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddresses: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityDeletedEvent(event)).toEqual(false)
    })
  })

  describe('CommunityDeletedContentViolationEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityDeletedContentViolationEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedContentViolationEvent(event)).toEqual(true)
      expect(validateCommunityDeletedContentViolationEvent(null)).toEqual(false)
      expect(validateCommunityDeletedContentViolationEvent({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedContentViolationEvent(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          ownerAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedContentViolationEvent(event)).toEqual(false)
    })

    it('should fail with missing ownerAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityDeletedContentViolationEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          ownerAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityDeletedContentViolationEvent(event)).toEqual(false)
    })
  })

  describe('CommunityRenamedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityRenamedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.RENAMED,
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

      expect(validateCommunityRenamedEvent(event)).toEqual(true)
      expect(validateCommunityRenamedEvent(null)).toEqual(false)
      expect(validateCommunityRenamedEvent({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRenamedEvent(event)).toEqual(false)
    })

    it('should fail with missing oldName', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRenamedEvent(event)).toEqual(false)
    })

    it('should fail with missing newName', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890'],
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRenamedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddresses', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRenamedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.RENAMED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          oldName: 'Old Community Name',
          newName: 'New Community Name',
          memberAddresses: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRenamedEvent(event)).toEqual(false)
    })
  })

  describe('CommunityMemberBannedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityMemberBannedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberBannedEvent(event)).toEqual(true)
      expect(validateCommunityMemberBannedEvent(null)).toEqual(false)
      expect(validateCommunityMemberBannedEvent({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberBannedEvent(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberBannedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberBannedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_BANNED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityMemberBannedEvent(event)).toEqual(false)
    })
  })

  describe('CommunityMemberLeftEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityMemberLeftEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_LEFT,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityMemberLeftEvent(event)).toEqual(true)
      expect(validateCommunityMemberLeftEvent(null)).toEqual(false)
      expect(validateCommunityMemberLeftEvent({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_LEFT,
        key: 'key',
        timestamp: 1,
        metadata: {
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityMemberLeftEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_LEFT,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123'
        }
      }

      expect(validateCommunityMemberLeftEvent(event)).toEqual(false)
    })
  })

  describe('CommunityMemberRemovedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityMemberRemovedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberRemovedEvent(event)).toEqual(true)
      expect(validateCommunityMemberRemovedEvent(null)).toEqual(false)
      expect(validateCommunityMemberRemovedEvent({})).toEqual(false)
    })

    it('should fail with missing id', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberRemovedEvent(event)).toEqual(false)
    })

    it('should fail with missing name', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberRemovedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityMemberRemovedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.MEMBER_REMOVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          id: 'community-123',
          name: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityMemberRemovedEvent(event)).toEqual(false)
    })
  })

  describe('CommunityRequestToJoinReceivedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityRequestToJoinReceivedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          memberName: 'Test Member',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
          addressesToNotify: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(true)
      expect(validateCommunityRequestToJoinReceivedEvent(null)).toEqual(false)
      expect(validateCommunityRequestToJoinReceivedEvent({})).toEqual(false)
    })

    it('should fail with missing communityId', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          memberName: 'Test Member',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
          addressesToNotify: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing communityName', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          memberName: 'Test Member',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
          addressesToNotify: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberName', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
          addressesToNotify: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberName: 'Test Member',
          thumbnailUrl: 'https://example.com/thumbnail.jpg',
          addressesToNotify: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          memberName: 'Test Member',
          addressesToNotify: ['0x1234567890123456789012345678901234567890']
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing addressesToNotify', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          memberName: 'Test Member',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRequestToJoinReceivedEvent(event)).toEqual(false)
    })
  })

  describe('CommunityRequestToJoinAcceptedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityRequestToJoinAcceptedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRequestToJoinAcceptedEvent(event)).toEqual(true)
      expect(validateCommunityRequestToJoinAcceptedEvent(null)).toEqual(false)
      expect(validateCommunityRequestToJoinAcceptedEvent({})).toEqual(false)
    })

    it('should fail with missing communityId', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRequestToJoinAcceptedEvent(event)).toEqual(false)
    })

    it('should fail with missing communityName', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRequestToJoinAcceptedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityRequestToJoinAcceptedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityRequestToJoinAcceptedEvent(event)).toEqual(false)
    })
  })

  describe('CommunityInviteReceivedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CommunityInviteReceivedEvent = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.INVITE_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityInviteReceivedEvent(event)).toEqual(true)
      expect(validateCommunityInviteReceivedEvent(null)).toEqual(false)
      expect(validateCommunityInviteReceivedEvent({})).toEqual(false)
    })

    it('should fail with missing communityId', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.INVITE_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityInviteReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing communityName', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.INVITE_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          memberAddress: '0x1234567890123456789012345678901234567890',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityInviteReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing memberAddress', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.INVITE_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          thumbnailUrl: 'https://example.com/thumbnail.jpg'
        }
      }

      expect(validateCommunityInviteReceivedEvent(event)).toEqual(false)
    })

    it('should fail with missing thumbnailUrl', () => {
      const event: any = {
        type: EventType.COMMUNITY,
        subType: EventSubTypeCommunity.INVITE_RECEIVED,
        key: 'key',
        timestamp: 1,
        metadata: {
          communityId: 'community-123',
          communityName: 'Test Community',
          memberAddress: '0x1234567890123456789012345678901234567890'
        }
      }

      expect(validateCommunityInviteReceivedEvent(event)).toEqual(false)
    })
  })
})

describe('CommunityOwnershipTransferredEvent', () => {
  it('should pass validation with valid data', () => {
    const event: CommunityOwnershipTransferredEvent = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        oldOwnerAddress: '0x1234567890123456789012345678901234567890',
        newOwnerAddress: '0x0987654321098765432109876543210987654321',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityOwnershipTransferredEvent(event)).toEqual(true)
    expect(validateCommunityOwnershipTransferredEvent(null)).toEqual(false)
    expect(validateCommunityOwnershipTransferredEvent({})).toEqual(false)
  })

  it('should fail with missing communityId', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityName: 'Test Community',
        oldOwnerAddress: '0x1234567890123456789012345678901234567890',
        newOwnerAddress: '0x0987654321098765432109876543210987654321',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityOwnershipTransferredEvent(event)).toEqual(false)
  })

  it('should fail with missing communityName', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        oldOwnerAddress: '0x1234567890123456789012345678901234567890',
        newOwnerAddress: '0x0987654321098765432109876543210987654321',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityOwnershipTransferredEvent(event)).toEqual(false)
  })

  it('should fail with missing oldOwnerAddress', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityOwnershipTransferredEvent(event)).toEqual(false)
  })

  it('should fail with missing newOwnerAddress', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        oldOwnerAddress: '0x1234567890123456789012345678901234567890',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityOwnershipTransferredEvent(event)).toEqual(false)
  })

  it('should fail with missing thumbnailUrl', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        oldOwnerAddress: '0x1234567890123456789012345678901234567890',
        newOwnerAddress: '0x0987654321098765432109876543210987654321'
      }
    }

    expect(validateCommunityOwnershipTransferredEvent(event)).toEqual(false)
  })

  it('should pass validation with valid data', () => {
    const event: CommunityPostAddedEvent = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.POST_ADDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        postId: 'post-123',
        authorAddress: '0x1234567890123456789012345678901234567890',
        addressesToNotify: ['0x1234567890123456789012345678901234567890']
      }
    }

    expect(validateCommunityPostAddedEvent(event)).toEqual(true)
    expect(validateCommunityPostAddedEvent(null)).toEqual(false)
    expect(validateCommunityPostAddedEvent({})).toEqual(false)
  })

  it('should fail with missing communityId', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.POST_ADDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityName: 'Test Community',
        addressesToNotify: ['0x1234567890123456789012345678901234567890'],
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityPostAddedEvent(event)).toEqual(false)
  })

  it('should fail with missing communityName', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.POST_ADDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        memberAddress: '0x1234567890123456789012345678901234567890',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        postId: 'post-123',
        authorAddress: '0x1234567890123456789012345678901234567890'
      }
    }

    expect(validateCommunityPostAddedEvent(event)).toEqual(false)
  })

  it('should fail with missing memberAddress', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.POST_ADDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityPostAddedEvent(event)).toEqual(false)
  })

  it('should fail with missing thumbnailUrl', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.POST_ADDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        memberAddress: '0x1234567890123456789012345678901234567890'
      }
    }

    expect(validateCommunityPostAddedEvent(event)).toEqual(false)
  })
})

describe('CommunityVoiceChatStartedEvent', () => {
  it('should pass validation with valid data', () => {
    const event: CommunityVoiceChatStartedEvent = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.VOICE_CHAT_STARTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        addressesToNotify: ['0x1234567890123456789012345678901234567890', '0x0987654321098765432109876543210987654321']
      }
    }

    expect(validateCommunityVoiceChatStartedEvent(event)).toEqual(true)
    expect(validateCommunityVoiceChatStartedEvent(null)).toEqual(false)
    expect(validateCommunityVoiceChatStartedEvent({})).toEqual(false)
  })

  it('should fail with missing communityId', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.VOICE_CHAT_STARTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityName: 'Test Community',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        addressesToNotify: ['0x1234567890123456789012345678901234567890']
      }
    }

    expect(validateCommunityVoiceChatStartedEvent(event)).toEqual(false)
  })

  it('should fail with missing communityName', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.VOICE_CHAT_STARTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        thumbnailUrl: 'https://example.com/thumbnail.jpg',
        addressesToNotify: ['0x1234567890123456789012345678901234567890']
      }
    }

    expect(validateCommunityVoiceChatStartedEvent(event)).toEqual(false)
  })

  it('should fail with missing thumbnailUrl', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.VOICE_CHAT_STARTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        addressesToNotify: ['0x1234567890123456789012345678901234567890']
      }
    }

    expect(validateCommunityVoiceChatStartedEvent(event)).toEqual(false)
  })

  it('should fail with missing addressesToNotify', () => {
    const event: any = {
      type: EventType.COMMUNITY,
      subType: EventSubTypeCommunity.VOICE_CHAT_STARTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        communityId: 'community-123',
        communityName: 'Test Community',
        thumbnailUrl: 'https://example.com/thumbnail.jpg'
      }
    }

    expect(validateCommunityVoiceChatStartedEvent(event)).toEqual(false)
  })
})
