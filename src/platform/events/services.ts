import { EthAddress } from '../../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type BadgeGrantedEvent = BaseEvent & {
  type: Events.Type.BADGE
  subType: Events.SubType.Badge.GRANTED
  metadata: {
    badgeId: string
    badgeName: string
    badgeTierName?: string
    badgeImageUrl: string
    address: string
  }
}

export namespace BadgeGrantedEvent {
  export const schema: JSONSchema<BadgeGrantedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BADGE },
      subType: { type: 'string', const: Events.SubType.Badge.GRANTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          badgeId: { type: 'string' },
          badgeTierName: { type: 'string', nullable: true },
          badgeName: { type: 'string' },
          badgeImageUrl: { type: 'string' },
          address: { type: 'string' }
        },
        required: ['badgeId', 'badgeName', 'badgeImageUrl', 'address']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<BadgeGrantedEvent> = generateLazyValidator(schema)
}

export type AssetBundleConversionFinishedEvent = BaseEvent & {
  type: Events.Type.ASSET_BUNDLE
  subType: Events.SubType.AssetBundle.CONVERTED
  metadata: {
    entityId: string
    platform: 'windows' | 'mac' | 'webgl'
    statusCode: number
    isLods: boolean
    isWorld: boolean
  }
}

export namespace AssetBundleConversionFinishedEvent {
  export const schema: JSONSchema<AssetBundleConversionFinishedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.ASSET_BUNDLE },
      subType: { type: 'string', const: Events.SubType.AssetBundle.CONVERTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          entityId: { type: 'string' },
          platform: { type: 'string', enum: ['windows', 'mac', 'webgl'] },
          statusCode: { type: 'number' },
          isLods: { type: 'boolean' },
          isWorld: { type: 'boolean' }
        },
        required: ['entityId', 'platform', 'statusCode', 'isLods', 'isWorld']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<AssetBundleConversionFinishedEvent> = generateLazyValidator(schema)
}

export type AssetBundleConversionManuallyQueuedEvent = BaseEvent & {
  type: Events.Type.ASSET_BUNDLE
  subType: Events.SubType.AssetBundle.MANUALLY_QUEUED
  metadata: {
    entityId: string
    platform: 'windows' | 'mac' | 'webgl'
    isLods: boolean
    isPriority: boolean
  }
}

export namespace AssetBundleConversionManuallyQueuedEvent {
  export const schema: JSONSchema<AssetBundleConversionManuallyQueuedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.ASSET_BUNDLE },
      subType: { type: 'string', const: Events.SubType.AssetBundle.MANUALLY_QUEUED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          entityId: { type: 'string' },
          platform: { type: 'string', enum: ['windows', 'mac', 'webgl'] },
          isLods: { type: 'boolean' },
          isPriority: { type: 'boolean' }
        },
        required: ['entityId', 'platform', 'isLods']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<AssetBundleConversionManuallyQueuedEvent> = generateLazyValidator(schema)
}

export type FriendshipRequestEvent = BaseEvent & {
  type: Events.Type.SOCIAL_SERVICE
  subType: Events.SubType.SocialService.FRIENDSHIP_REQUEST
  metadata: {
    requestId: string
    sender: {
      address: string
      name: string
      profileImageUrl: string
      hasClaimedName: boolean
    }
    receiver: {
      address: string
      name: string
      profileImageUrl: string
      hasClaimedName: boolean
    }
    message?: string
  }
}
export namespace FriendshipRequestEvent {
  export const schema: JSONSchema<FriendshipRequestEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.SOCIAL_SERVICE },
      subType: { type: 'string', const: Events.SubType.SocialService.FRIENDSHIP_REQUEST },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          requestId: { type: 'string' },
          sender: {
            type: 'object',
            properties: {
              address: { type: 'string' },
              name: { type: 'string' },
              profileImageUrl: { type: 'string' },
              hasClaimedName: { type: 'boolean' }
            },
            required: ['address', 'name', 'profileImageUrl', 'hasClaimedName']
          },
          receiver: {
            type: 'object',
            properties: {
              address: { type: 'string' },
              name: { type: 'string' },
              profileImageUrl: { type: 'string' },
              hasClaimedName: { type: 'boolean' }
            },
            required: ['address', 'name', 'profileImageUrl', 'hasClaimedName']
          },
          message: { type: 'string', nullable: true }
        },
        required: ['requestId', 'sender', 'receiver']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<FriendshipRequestEvent> = generateLazyValidator(schema)
}

export type FriendshipAcceptedEvent = BaseEvent & {
  type: Events.Type.SOCIAL_SERVICE
  subType: Events.SubType.SocialService.FRIENDSHIP_ACCEPTED
  metadata: {
    requestId: string
    sender: {
      address: string
      name: string
      profileImageUrl: string
      hasClaimedName: boolean
    }
    receiver: {
      address: string
      name: string
      profileImageUrl: string
      hasClaimedName: boolean
    }
  }
}

export namespace FriendshipAcceptedEvent {
  export const schema: JSONSchema<FriendshipAcceptedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.SOCIAL_SERVICE },
      subType: { type: 'string', const: Events.SubType.SocialService.FRIENDSHIP_ACCEPTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          requestId: { type: 'string' },
          sender: {
            type: 'object',
            properties: {
              address: { type: 'string' },
              name: { type: 'string' },
              profileImageUrl: { type: 'string' },
              hasClaimedName: { type: 'boolean' }
            },
            required: ['address', 'name', 'profileImageUrl', 'hasClaimedName']
          },
          receiver: {
            type: 'object',
            properties: {
              address: { type: 'string' },
              name: { type: 'string' },
              profileImageUrl: { type: 'string' },
              hasClaimedName: { type: 'boolean' }
            },
            required: ['address', 'name', 'profileImageUrl', 'hasClaimedName']
          }
        },
        required: ['requestId', 'sender', 'receiver']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<FriendshipAcceptedEvent> = generateLazyValidator(schema)
}

export type CreditsGoalCompletedEvent = BaseEvent & {
  type: Events.Type.CREDITS_SERVICE
  subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED
  metadata: {
    goalId: string
    creditsObtained: number
    seasonId: number
    weekNumber: number
    address: EthAddress
  }
}

export namespace CreditsGoalCompletedEvent {
  export const schema: JSONSchema<CreditsGoalCompletedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CREDITS_SERVICE },
      subType: { type: 'string', const: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          goalId: { type: 'string' },
          creditsObtained: { type: 'number', minimum: 0 },
          seasonId: { type: 'number', minimum: 1 },
          weekNumber: { type: 'number', minimum: 1 },
          address: { type: 'string' }
        },
        required: ['goalId', 'creditsObtained', 'seasonId', 'weekNumber', 'address']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<CreditsGoalCompletedEvent> = generateLazyValidator(schema)
}

export type CreditsCompleteGoalsReminderEvent = BaseEvent & {
  type: Events.Type.CREDITS_SERVICE
  subType: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER
  metadata: {
    address: EthAddress
    seasonId: number
    weekNumber: number
    pendingGoalIds: string[]
  }
}

export namespace CreditsCompleteGoalsReminderEvent {
  export const schema: JSONSchema<CreditsCompleteGoalsReminderEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CREDITS_SERVICE },
      subType: { type: 'string', const: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          seasonId: { type: 'number', minimum: 1 },
          weekNumber: { type: 'number', minimum: 1 },
          pendingGoalIds: { type: 'array', items: { type: 'string' }, minItems: 1 }
        },
        required: ['address', 'seasonId', 'weekNumber', 'pendingGoalIds']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<CreditsCompleteGoalsReminderEvent> = generateLazyValidator(schema)
}

export type CreditsUsageReminderEvent = BaseEvent & {
  type: Events.Type.CREDITS_SERVICE
  subType: Events.SubType.CreditsService.USAGE_REMINDER
  metadata: {
    address: EthAddress
    creditsAmount: number
    expirationDate: string
    expirationDay: string
  }
}

export namespace CreditsUsageReminderEvent {
  export const schema: JSONSchema<CreditsUsageReminderEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CREDITS_SERVICE },
      subType: { type: 'string', const: Events.SubType.CreditsService.USAGE_REMINDER },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          creditsAmount: { type: 'number', minimum: 1 },
          expirationDate: { type: 'string' },
          expirationDay: { type: 'string' }
        },
        required: ['address', 'creditsAmount', 'expirationDate', 'expirationDay']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<CreditsUsageReminderEvent> = generateLazyValidator(schema)
}

export type CreditsUsage24HoursReminderEvent = BaseEvent & {
  type: Events.Type.CREDITS_SERVICE
  subType: Events.SubType.CreditsService.USAGE_24_HOURS_REMINDER
  metadata: {
    address: EthAddress
    creditsAmount: number
    expirationDate: string
  }
}

export namespace CreditsUsage24HoursReminderEvent {
  export const schema: JSONSchema<CreditsUsage24HoursReminderEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CREDITS_SERVICE },
      subType: { type: 'string', const: Events.SubType.CreditsService.USAGE_24_HOURS_REMINDER },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          creditsAmount: { type: 'number', minimum: 1 },
          expirationDate: { type: 'string' }
        },
        required: ['address', 'creditsAmount', 'expirationDate']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<CreditsUsage24HoursReminderEvent> = generateLazyValidator(schema)
}

export type CreditsDoNotMissOutReminderEvent = BaseEvent & {
  type: Events.Type.CREDITS_SERVICE
  subType: Events.SubType.CreditsService.DO_NOT_MISS_OUT_REMINDER
  metadata: {
    address: EthAddress
  }
}

export namespace CreditsDoNotMissOutReminderEvent {
  export const schema: JSONSchema<CreditsDoNotMissOutReminderEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CREDITS_SERVICE },
      subType: { type: 'string', const: Events.SubType.CreditsService.DO_NOT_MISS_OUT_REMINDER },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          address: { type: 'string' }
        },
        required: ['address']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<CreditsDoNotMissOutReminderEvent> = generateLazyValidator(schema)
}

export type CreditsClaimReminderEvent = BaseEvent & {
  type: Events.Type.CREDITS_SERVICE
  subType: Events.SubType.CreditsService.CLAIM_CREDITS_REMINDER
  metadata: {
    address: EthAddress
    seasonId: number
    weekNumber: number
  }
}

export namespace CreditsClaimReminderEvent {
  export const schema: JSONSchema<CreditsClaimReminderEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CREDITS_SERVICE },
      subType: { type: 'string', const: Events.SubType.CreditsService.CLAIM_CREDITS_REMINDER },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          seasonId: { type: 'number', minimum: 1 },
          weekNumber: { type: 'number', minimum: 1 }
        },
        required: ['address', 'seasonId', 'weekNumber']
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<CreditsClaimReminderEvent> = generateLazyValidator(schema)
}
