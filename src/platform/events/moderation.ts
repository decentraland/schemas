import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type UserBanCreatedEvent = BaseEvent & {
  type: Events.Type.MODERATION
  subType: Events.SubType.Moderation.USER_BAN_CREATED
  metadata: {
    id: string
    bannedAddress: string
    bannedBy: string
    reason: string
    /** Unix timestamp (ms) when the ban was created. */
    bannedAt: number
    /** Unix timestamp (ms) when the ban expires. null means permanent ban. */
    expiresAt: number | null
    customMessage?: string
  }
}

export namespace UserBanCreatedEvent {
  export const schema: JSONSchema<UserBanCreatedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.MODERATION },
      subType: { type: 'string', const: Events.SubType.Moderation.USER_BAN_CREATED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          bannedAddress: { type: 'string' },
          bannedBy: { type: 'string' },
          reason: { type: 'string' },
          bannedAt: { type: 'number', minimum: 0 },
          expiresAt: { type: 'number', nullable: true, minimum: 0 },
          customMessage: { type: 'string', nullable: true }
        },
        required: ['id', 'bannedAddress', 'bannedBy', 'reason', 'bannedAt', 'expiresAt']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<UserBanCreatedEvent> = generateLazyValidator(schema)
}

export type UserWarningCreatedEvent = BaseEvent & {
  type: Events.Type.MODERATION
  subType: Events.SubType.Moderation.USER_WARNING_CREATED
  metadata: {
    id: string
    warnedAddress: string
    warnedBy: string
    reason: string
    /** Unix timestamp (ms) when the warning was created. */
    warnedAt: number
  }
}

export namespace UserWarningCreatedEvent {
  export const schema: JSONSchema<UserWarningCreatedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.MODERATION },
      subType: { type: 'string', const: Events.SubType.Moderation.USER_WARNING_CREATED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          warnedAddress: { type: 'string' },
          warnedBy: { type: 'string' },
          reason: { type: 'string' },
          warnedAt: { type: 'number', minimum: 0 }
        },
        required: ['id', 'warnedAddress', 'warnedBy', 'reason', 'warnedAt']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<UserWarningCreatedEvent> = generateLazyValidator(schema)
}
