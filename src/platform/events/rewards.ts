import { EthAddress } from '../../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

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

type Metadata = RewardEventMetadata | CampaignWellKnownIssueEventMetadata

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

export type CampaignOutOfFundsEvent = BaseEvent & {
  type: Events.Type.REWARDS
  subType: Events.SubType.Rewards.CAMPAIGN_OUT_OF_FUNDS
  metadata: CampaignWellKnownIssueEventMetadata
}

export type CampaignGasPriceHigherThanExpectedEvent = BaseEvent & {
  type: Events.Type.REWARDS
  subType: Events.SubType.Rewards.CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED
  metadata: CampaignWellKnownIssueEventMetadata
}

export type CampaignOutOfStockEvent = BaseEvent & {
  type: Events.Type.REWARDS
  subType: Events.SubType.Rewards.CAMPAIGN_OUT_OF_STOCK
  metadata: CampaignWellKnownIssueEventMetadata
}

export type RewardDelayedEvent = BaseEvent & {
  type: Events.Type.REWARDS
  subType: Events.SubType.Rewards.REWARD_DELAYED
  metadata: RewardEventMetadata
}

function createSchema<T>(subType: string, metadataSchema: JSONSchema<Metadata>): JSONSchema<T> {
  return {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.REWARDS },
      subType: { type: 'string', const: subType },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: metadataSchema
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  } as JSONSchema<T>
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

export namespace RewardInProgressEvent {
  export const schema: JSONSchema<RewardInProgressEvent> = createSchema(
    Events.SubType.Rewards.REWARD_IN_PROGRESS,
    rewardEventMetadataSchema
  )
  export const validate: ValidateFunction<RewardInProgressEvent> = generateLazyValidator(schema)
}

export namespace RewardAssignedEvent {
  export const schema: JSONSchema<RewardAssignedEvent> = createSchema(
    Events.SubType.Rewards.REWARD_ASSIGNED,
    rewardEventMetadataSchema
  )
  export const validate: ValidateFunction<RewardAssignedEvent> = generateLazyValidator(schema)
}

export namespace CampaignOutOfFundsEvent {
  export const schema: JSONSchema<CampaignOutOfFundsEvent> = createSchema(
    Events.SubType.Rewards.CAMPAIGN_OUT_OF_FUNDS,
    campaignEventMetadataSchema
  )
  export const validate: ValidateFunction<CampaignOutOfFundsEvent> = generateLazyValidator(schema)
}

export namespace CampaignGasPriceHigherThanExpectedEvent {
  export const schema: JSONSchema<CampaignGasPriceHigherThanExpectedEvent> = createSchema(
    Events.SubType.Rewards.CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED,
    campaignEventMetadataSchema
  )
  export const validate: ValidateFunction<CampaignGasPriceHigherThanExpectedEvent> = generateLazyValidator(schema)
}

export namespace CampaignOutOfStockEvent {
  export const schema: JSONSchema<CampaignOutOfStockEvent> = createSchema(
    Events.SubType.Rewards.CAMPAIGN_OUT_OF_STOCK,
    campaignEventMetadataSchema
  )
  export const validate: ValidateFunction<CampaignOutOfStockEvent> = generateLazyValidator(schema)
}

export namespace RewardDelayedEvent {
  export const schema: JSONSchema<RewardDelayedEvent> = createSchema(
    Events.SubType.Rewards.REWARD_DELAYED,
    rewardEventMetadataSchema
  )
  export const validate: ValidateFunction<RewardDelayedEvent> = generateLazyValidator(schema)
}