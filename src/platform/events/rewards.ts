import { EthAddress } from '../../misc/index.js'
import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeRewards } from './base.js'
import { createEventSchema } from './utils.js'

type BaseEventMetadata = {
  title: string
  description: string
  link?: string
}

export type RewardEventMetadata = BaseEventMetadata & {
  beneficiary: EthAddress
  tokenName: string
  tokenImage: string
  tokenRarity?: string
  tokenCategory?: string
}

export type CampaignWellKnownIssueEventMetadata = BaseEventMetadata & {
  owner: EthAddress
  campaignId: string
  campaignName: string
}

export type RewardInProgressEvent = BaseEvent & {
  type: EventType.REWARDS
  subType: EventSubTypeRewards.REWARD_IN_PROGRESS
  metadata: RewardEventMetadata
}

export type RewardAssignedEvent = BaseEvent & {
  type: EventType.REWARDS
  subType: EventSubTypeRewards.REWARD_ASSIGNED
  metadata: RewardEventMetadata
}

export type CampaignOutOfFundsEvent = BaseEvent & {
  type: EventType.REWARDS
  subType: EventSubTypeRewards.CAMPAIGN_OUT_OF_FUNDS
  metadata: CampaignWellKnownIssueEventMetadata
}

export type CampaignGasPriceHigherThanExpectedEvent = BaseEvent & {
  type: EventType.REWARDS
  subType: EventSubTypeRewards.CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED
  metadata: CampaignWellKnownIssueEventMetadata
}

export type CampaignOutOfStockEvent = BaseEvent & {
  type: EventType.REWARDS
  subType: EventSubTypeRewards.CAMPAIGN_OUT_OF_STOCK
  metadata: CampaignWellKnownIssueEventMetadata
}

export type RewardDelayedEvent = BaseEvent & {
  type: EventType.REWARDS
  subType: EventSubTypeRewards.REWARD_DELAYED
  metadata: RewardEventMetadata
}

const rewardEventMetadataSchema: JSONSchema<RewardEventMetadata> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    link: { type: 'string', nullable: true },
    beneficiary: { type: 'string' },
    tokenName: { type: 'string' },
    tokenImage: { type: 'string' },
    tokenRarity: { type: 'string', nullable: true },
    tokenCategory: { type: 'string', nullable: true }
  },
  required: ['title', 'description', 'beneficiary', 'tokenName', 'tokenImage'],
  additionalProperties: false
}

const campaignEventMetadataSchema: JSONSchema<CampaignWellKnownIssueEventMetadata> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    link: { type: 'string', nullable: true },
    owner: { type: 'string' },
    campaignId: { type: 'string' },
    campaignName: { type: 'string' }
  },
  required: ['title', 'description', 'owner', 'campaignId', 'campaignName'],
  additionalProperties: false
}

export const rewardInProgressEventSchema: JSONSchema<RewardInProgressEvent> = createEventSchema(
  EventType.REWARDS,
  EventSubTypeRewards.REWARD_IN_PROGRESS,
  rewardEventMetadataSchema
)

export const rewardAssignedEventSchema: JSONSchema<RewardAssignedEvent> = createEventSchema(
  EventType.REWARDS,
  EventSubTypeRewards.REWARD_ASSIGNED,
  rewardEventMetadataSchema
)

export const campaignOutOfFundsEventSchema: JSONSchema<CampaignOutOfFundsEvent> = createEventSchema(
  EventType.REWARDS,
  EventSubTypeRewards.CAMPAIGN_OUT_OF_FUNDS,
  campaignEventMetadataSchema
)

export const campaignGasPriceHigherThanExpectedEventSchema: JSONSchema<CampaignGasPriceHigherThanExpectedEvent> =
  createEventSchema(
    EventType.REWARDS,
    EventSubTypeRewards.CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED,
    campaignEventMetadataSchema
  )

export const campaignOutOfStockEventSchema: JSONSchema<CampaignOutOfStockEvent> = createEventSchema(
  EventType.REWARDS,
  EventSubTypeRewards.CAMPAIGN_OUT_OF_STOCK,
  campaignEventMetadataSchema
)

export const rewardDelayedEventSchema: JSONSchema<RewardDelayedEvent> = createEventSchema(
  EventType.REWARDS,
  EventSubTypeRewards.REWARD_DELAYED,
  rewardEventMetadataSchema
)
