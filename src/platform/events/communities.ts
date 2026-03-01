import { EthAddress } from '../../misc/index.js'
import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeCommunity } from './base.js'

type Audience = {
  addressesToNotify: EthAddress[]
}

export type CommunityDeletedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.DELETED
  metadata: {
    id: string
    name: string
    memberAddresses: EthAddress[]
    thumbnailUrl: string
  }
}

export const communityDeletedEventSchema: JSONSchema<CommunityDeletedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.DELETED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        memberAddresses: { type: 'array', items: { type: 'string' } },
        thumbnailUrl: { type: 'string' }
      },
      required: ['id', 'name', 'memberAddresses', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityDeletedContentViolationEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION
  metadata: {
    id: string
    name: string
    ownerAddress: EthAddress
    thumbnailUrl: string
  }
}

export const communityDeletedContentViolationEventSchema: JSONSchema<CommunityDeletedContentViolationEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.DELETED_CONTENT_VIOLATION },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        ownerAddress: { type: 'string' },
        thumbnailUrl: { type: 'string' }
      },
      required: ['id', 'name', 'ownerAddress', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityRenamedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.RENAMED
  metadata: {
    id: string
    oldName: string
    newName: string
    memberAddresses: EthAddress[]
    thumbnailUrl: string
  }
}

export const communityRenamedEventSchema: JSONSchema<CommunityRenamedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.RENAMED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        oldName: { type: 'string' },
        newName: { type: 'string' },
        memberAddresses: { type: 'array', items: { type: 'string' } },
        thumbnailUrl: { type: 'string' }
      },
      required: ['id', 'oldName', 'newName', 'memberAddresses', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityMemberBannedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.MEMBER_BANNED
  metadata: {
    id: string
    name: string
    memberAddress: EthAddress
    thumbnailUrl: string
  }
}

export const communityMemberBannedEventSchema: JSONSchema<CommunityMemberBannedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.MEMBER_BANNED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        memberAddress: { type: 'string' },
        thumbnailUrl: { type: 'string' }
      },
      required: ['id', 'name', 'memberAddress', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityMemberLeftEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.MEMBER_LEFT
  metadata: {
    id: string
    memberAddress: EthAddress
  }
}

export const communityMemberLeftEventSchema: JSONSchema<CommunityMemberLeftEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.MEMBER_LEFT },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        memberAddress: { type: 'string' }
      },
      required: ['id', 'memberAddress'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityMemberRemovedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.MEMBER_REMOVED
  metadata: {
    id: string
    name: string
    memberAddress: EthAddress
    thumbnailUrl: string
  }
}

export const communityMemberRemovedEventSchema: JSONSchema<CommunityMemberRemovedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.MEMBER_REMOVED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        memberAddress: { type: 'string' },
        thumbnailUrl: { type: 'string' }
      },
      required: ['id', 'name', 'memberAddress', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityRequestToJoinReceivedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED
  metadata: Audience & {
    communityId: string
    communityName: string
    memberAddress: EthAddress
    memberName: string
    thumbnailUrl: string
  }
}

export const communityRequestToJoinReceivedEventSchema: JSONSchema<CommunityRequestToJoinReceivedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.REQUEST_TO_JOIN_RECEIVED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        memberAddress: { type: 'string' },
        memberName: { type: 'string' },
        thumbnailUrl: { type: 'string' },
        addressesToNotify: { type: 'array', items: { type: 'string' } }
      },
      required: ['communityId', 'communityName', 'memberAddress', 'memberName', 'thumbnailUrl', 'addressesToNotify'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityRequestToJoinAcceptedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED
  metadata: {
    communityId: string
    communityName: string
    memberAddress: EthAddress
    thumbnailUrl: string
  }
}

export const communityRequestToJoinAcceptedEventSchema: JSONSchema<CommunityRequestToJoinAcceptedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.REQUEST_TO_JOIN_ACCEPTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        memberAddress: { type: 'string' },
        thumbnailUrl: { type: 'string' }
      },
      required: ['communityId', 'communityName', 'memberAddress', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityInviteReceivedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.INVITE_RECEIVED
  metadata: {
    communityId: string
    communityName: string
    memberAddress: EthAddress
    thumbnailUrl: string
  }
}

export const communityInviteReceivedEventSchema: JSONSchema<CommunityInviteReceivedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.INVITE_RECEIVED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        memberAddress: { type: 'string' },
        thumbnailUrl: { type: 'string' }
      },
      required: ['communityId', 'communityName', 'memberAddress', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityPostAddedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.POST_ADDED
  metadata: Audience & {
    communityId: string
    communityName: string
    thumbnailUrl: string
    postId: string
    authorAddress: EthAddress
  }
}

export const communityPostAddedEventSchema: JSONSchema<CommunityPostAddedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.POST_ADDED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        thumbnailUrl: { type: 'string' },
        postId: { type: 'string' },
        authorAddress: { type: 'string' },
        addressesToNotify: { type: 'array', items: { type: 'string' } }
      },
      required: ['addressesToNotify', 'communityId', 'communityName', 'thumbnailUrl', 'postId', 'authorAddress'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityOwnershipTransferredEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED
  metadata: {
    communityId: string
    communityName: string
    oldOwnerAddress: EthAddress
    newOwnerAddress: EthAddress
    thumbnailUrl: string
  }
}

export const communityOwnershipTransferredEventSchema: JSONSchema<CommunityOwnershipTransferredEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.OWNERSHIP_TRANSFERRED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        oldOwnerAddress: { type: 'string' },
        newOwnerAddress: { type: 'string' },
        thumbnailUrl: { type: 'string' }
      },
      required: ['communityId', 'communityName', 'oldOwnerAddress', 'newOwnerAddress', 'thumbnailUrl'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type CommunityVoiceChatStartedEvent = BaseEvent & {
  type: EventType.COMMUNITY
  subType: EventSubTypeCommunity.VOICE_CHAT_STARTED
  metadata: Audience & {
    communityId: string
    communityName: string
    thumbnailUrl: string
  }
}

export const communityVoiceChatStartedEventSchema: JSONSchema<CommunityVoiceChatStartedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.COMMUNITY },
    subType: { type: 'string', const: EventSubTypeCommunity.VOICE_CHAT_STARTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        thumbnailUrl: { type: 'string' },
        addressesToNotify: { type: 'array', items: { type: 'string' } }
      },
      required: ['communityId', 'communityName', 'thumbnailUrl', 'addressesToNotify'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}
