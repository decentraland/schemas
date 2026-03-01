import { EthAddress } from '../../misc/index.js'
import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeBadge, EventSubTypeAssetBundle, EventSubTypeSocialService, EventSubTypeCreditsService } from './base.js'

export type BadgeGrantedEvent = BaseEvent & {
  type: EventType.BADGE
  subType: EventSubTypeBadge.GRANTED
  metadata: {
    badgeId: string
    badgeName: string
    badgeTierName?: string
    badgeImageUrl: string
    address: string
  }
}

export const badgeGrantedEventSchema: JSONSchema<BadgeGrantedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BADGE },
    subType: { type: 'string', const: EventSubTypeBadge.GRANTED },
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

export type AssetBundleConversionFinishedEvent = BaseEvent & {
  type: EventType.ASSET_BUNDLE
  subType: EventSubTypeAssetBundle.CONVERTED
  metadata: {
    entityId: string
    platform: 'windows' | 'mac' | 'webgl'
    statusCode: number
    isLods: boolean
    isWorld: boolean
    version: string
  }
}

export const assetBundleConversionFinishedEventSchema: JSONSchema<AssetBundleConversionFinishedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.ASSET_BUNDLE },
    subType: { type: 'string', const: EventSubTypeAssetBundle.CONVERTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        entityId: { type: 'string' },
        platform: { type: 'string', enum: ['windows', 'mac', 'webgl'] },
        statusCode: { type: 'number' },
        isLods: { type: 'boolean' },
        isWorld: { type: 'boolean' },
        version: { type: 'string' }
      },
      required: ['entityId', 'platform', 'statusCode', 'isLods', 'isWorld', 'version']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: true
}

export type AssetBundleConversionManuallyQueuedEvent = BaseEvent & {
  type: EventType.ASSET_BUNDLE
  subType: EventSubTypeAssetBundle.MANUALLY_QUEUED
  metadata: {
    entityId: string
    platform: 'windows' | 'mac' | 'webgl'
    isLods: boolean
    isPriority: boolean
    version: string
  }
}

export const assetBundleConversionManuallyQueuedEventSchema: JSONSchema<AssetBundleConversionManuallyQueuedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.ASSET_BUNDLE },
    subType: { type: 'string', const: EventSubTypeAssetBundle.MANUALLY_QUEUED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        entityId: { type: 'string' },
        platform: { type: 'string', enum: ['windows', 'mac', 'webgl'] },
        isLods: { type: 'boolean' },
        isPriority: { type: 'boolean' },
        version: { type: 'string' }
      },
      required: ['entityId', 'platform', 'isLods']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: true
}

export type FriendshipRequestEvent = BaseEvent & {
  type: EventType.SOCIAL_SERVICE
  subType: EventSubTypeSocialService.FRIENDSHIP_REQUEST
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
export const friendshipRequestEventSchema: JSONSchema<FriendshipRequestEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.SOCIAL_SERVICE },
    subType: { type: 'string', const: EventSubTypeSocialService.FRIENDSHIP_REQUEST },
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

export type FriendshipAcceptedEvent = BaseEvent & {
  type: EventType.SOCIAL_SERVICE
  subType: EventSubTypeSocialService.FRIENDSHIP_ACCEPTED
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

export const friendshipAcceptedEventSchema: JSONSchema<FriendshipAcceptedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.SOCIAL_SERVICE },
    subType: { type: 'string', const: EventSubTypeSocialService.FRIENDSHIP_ACCEPTED },
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

export type CreditsOnDemandEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.ON_DEMAND_CREDITS_GRANTED
  metadata: {
    creditsGranted: number
    address: EthAddress
    granterAddress: EthAddress
  }
}

export const creditsOnDemandEventSchema: JSONSchema<CreditsOnDemandEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.ON_DEMAND_CREDITS_GRANTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        creditsGranted: { type: 'number', minimum: 1 },
        address: { type: 'string' },
        granterAddress: { type: 'string' }
      },
      required: ['creditsGranted', 'address', 'granterAddress']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: true
}

export type CreditsGoalCompletedEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED
  metadata: {
    goalId: string
    creditsObtained: number
    seasonId: number
    weekNumber: number
    address: EthAddress
  }
}

export const creditsGoalCompletedEventSchema: JSONSchema<CreditsGoalCompletedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED },
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

export type CreditsCompleteGoalsReminderEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER
  metadata: {
    address: EthAddress
    seasonId: number
    weekNumber: number
    pendingGoalIds: string[]
  }
}

export const creditsCompleteGoalsReminderEventSchema: JSONSchema<CreditsCompleteGoalsReminderEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER },
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

export type CreditsUsageReminderEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.USAGE_REMINDER
  metadata: {
    address: EthAddress
    creditsAmount: number
    expirationDate: string
    expirationDay: string
  }
}

export const creditsUsageReminderEventSchema: JSONSchema<CreditsUsageReminderEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.USAGE_REMINDER },
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

export type CreditsNewSeasonReminderEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.NEW_SEASON_REMINDER
  metadata: {
    addresses: EthAddress[]
    seasonName: string
    startDate: string
    endDate: string
  }
}

export const creditsNewSeasonReminderEventSchema: JSONSchema<CreditsNewSeasonReminderEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.NEW_SEASON_REMINDER },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        addresses: { type: 'array', items: { type: 'string' } },
        seasonName: { type: 'string' },
        startDate: { type: 'string' },
        endDate: { type: 'string' }
      },
      required: ['addresses', 'seasonName', 'startDate', 'endDate']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: true
}

export type CreditsUsage24HoursReminderEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.USAGE_24_HOURS_REMINDER
  metadata: {
    address: EthAddress
    creditsAmount: number
    expirationDate: string
  }
}

export const creditsUsage24HoursReminderEventSchema: JSONSchema<CreditsUsage24HoursReminderEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.USAGE_24_HOURS_REMINDER },
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

export type CreditsDoNotMissOutReminderEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.DO_NOT_MISS_OUT_REMINDER
  metadata: {
    address: EthAddress
  }
}

export const creditsDoNotMissOutReminderEventSchema: JSONSchema<CreditsDoNotMissOutReminderEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.DO_NOT_MISS_OUT_REMINDER },
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

export type CreditsClaimReminderEvent = BaseEvent & {
  type: EventType.CREDITS_SERVICE
  subType: EventSubTypeCreditsService.CLAIM_CREDITS_REMINDER
  metadata: {
    address: EthAddress
    seasonId: number
    weekNumber: number
  }
}

export const creditsClaimReminderEventSchema: JSONSchema<CreditsClaimReminderEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CREDITS_SERVICE },
    subType: { type: 'string', const: EventSubTypeCreditsService.CLAIM_CREDITS_REMINDER },
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
