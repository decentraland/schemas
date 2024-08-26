import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type RewardEventMetadata = {
  title: string
  description: string
  beneficiary: string
  tokenName: string
  tokenImage: string
  tokenRarity?: string | null
  tokenCategory?: string | null
}

export type RewardInProgressEvent = BaseEvent & {
  type: Events.Type.REWARDS
  subType: Events.SubType.Rewards.REWARD_IN_PROGRESS
  metadata: RewardEventMetadata
}

export type RewardAssignedEvent = BaseEvent & {
  type: Events.Type.REWARDS
  subType: Events.SubType.Rewards.REWARD_ASSIGNED
  metadata: RewardEventMetadata
}

export namespace RewardInProgressEvent {
  export const schema: JSONSchema<RewardInProgressEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.REWARDS },
      subType: { type: 'string', const: Events.SubType.Rewards.REWARD_IN_PROGRESS },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          beneficiary: { type: 'string' },
          tokenName: { type: 'string' },
          tokenImage: { type: 'string' },
          tokenRarity: { type: 'string', nullable: true },
          tokenCategory: { type: 'string', nullable: true }
        },
        required: ['title', 'description', 'beneficiary', 'tokenName', 'tokenImage']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<RewardInProgressEvent> = generateLazyValidator(schema)
}

export namespace RewardAssignedEvent {
  export const schema: JSONSchema<RewardAssignedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.REWARDS },
      subType: { type: 'string', const: Events.SubType.Rewards.REWARD_ASSIGNED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          beneficiary: { type: 'string' },
          tokenName: { type: 'string' },
          tokenImage: { type: 'string' },
          tokenRarity: { type: 'string', nullable: true },
          tokenCategory: { type: 'string', nullable: true }
        },
        required: ['title', 'description', 'beneficiary', 'tokenName', 'tokenImage']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<RewardAssignedEvent> = generateLazyValidator(schema)
}
