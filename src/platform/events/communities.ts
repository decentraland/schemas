import { EthAddress } from '../../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type CommunityDeletedEvent = BaseEvent & {
  type: Events.Type.COMMUNITY
  subType: Events.SubType.Community.DELETED
  metadata: {
    id: string
    name: string
    memberAddresses: EthAddress[]
    thumbnailUrl: string
  }
}

export namespace CommunityDeletedEvent {
  export const schema: JSONSchema<CommunityDeletedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMUNITY },
      subType: { type: 'string', const: Events.SubType.Community.DELETED },
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

  export const validate: ValidateFunction<CommunityDeletedEvent> = generateLazyValidator(schema)
}

export type CommunityRenamedEvent = BaseEvent & {
  type: Events.Type.COMMUNITY
  subType: Events.SubType.Community.RENAMED
  metadata: {
    id: string
    oldName: string
    newName: string
    memberAddresses: EthAddress[]
    thumbnailUrl: string
  }
}

export namespace CommunityRenamedEvent {
  export const schema: JSONSchema<CommunityRenamedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMUNITY },
      subType: { type: 'string', const: Events.SubType.Community.RENAMED },
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

  export const validate: ValidateFunction<CommunityRenamedEvent> = generateLazyValidator(schema)
}

export type CommunityMemberBannedEvent = BaseEvent & {
  type: Events.Type.COMMUNITY
  subType: Events.SubType.Community.MEMBER_BANNED
  metadata: {
    id: string
    name: string
    memberAddress: EthAddress
    thumbnailUrl: string
  }
}

export namespace CommunityMemberBannedEvent {
  export const schema: JSONSchema<CommunityMemberBannedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMUNITY },
      subType: { type: 'string', const: Events.SubType.Community.MEMBER_BANNED },
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

  export const validate: ValidateFunction<CommunityMemberBannedEvent> = generateLazyValidator(schema)
}

export type CommunityMemberRemovedEvent = BaseEvent & {
  type: Events.Type.COMMUNITY
  subType: Events.SubType.Community.MEMBER_REMOVED
  metadata: {
    id: string
    name: string
    memberAddress: EthAddress
    thumbnailUrl: string
  }
}

export namespace CommunityMemberRemovedEvent {
  export const schema: JSONSchema<CommunityMemberRemovedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.COMMUNITY },
      subType: { type: 'string', const: Events.SubType.Community.MEMBER_REMOVED },
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

  export const validate: ValidateFunction<CommunityMemberRemovedEvent> = generateLazyValidator(schema)
}
