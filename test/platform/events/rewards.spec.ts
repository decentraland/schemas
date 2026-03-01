import { expect } from 'expect'
import {
  CampaignOutOfFundsEvent,
  CampaignGasPriceHigherThanExpectedEvent,
  CampaignOutOfStockEvent,
  EventType,
  EventSubTypeRewards,
  RewardAssignedEvent,
  RewardDelayedEvent,
  RewardInProgressEvent,
  campaignGasPriceHigherThanExpectedEventSchema,
  campaignOutOfFundsEventSchema,
  campaignOutOfStockEventSchema,
  rewardAssignedEventSchema,
  rewardDelayedEventSchema,
  rewardInProgressEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateCampaignGasPriceHigherThanExpectedEvent = generateLazyValidator(
  campaignGasPriceHigherThanExpectedEventSchema
)
const validateCampaignOutOfFundsEvent = generateLazyValidator(campaignOutOfFundsEventSchema)
const validateCampaignOutOfStockEvent = generateLazyValidator(campaignOutOfStockEventSchema)
const validateRewardAssignedEvent = generateLazyValidator(rewardAssignedEventSchema)
const validateRewardDelayedEvent = generateLazyValidator(rewardDelayedEventSchema)
const validateRewardInProgressEvent = generateLazyValidator(rewardInProgressEventSchema)

describe('Rewards Events tests', () => {
  it('RewardAssignedEvent static tests must pass', () => {
    const event: RewardAssignedEvent = {
      type: EventType.REWARDS,
      subType: EventSubTypeRewards.REWARD_ASSIGNED,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
        link: 'link',
        beneficiary: '0xBeneficiary',
        tokenName: 'tokenName',
        tokenImage: 'tokenImage',
        tokenRarity: 'tokenRarity',
        tokenCategory: 'tokenCategory'
      }
    }

    expect(validateRewardAssignedEvent(event)).toEqual(true)
    expect(validateRewardAssignedEvent(null)).toEqual(false)
    expect(validateRewardAssignedEvent({})).toEqual(false)
  })

  it('RewardInProgressEvent static tests must pass', () => {
    const event: RewardInProgressEvent = {
      type: EventType.REWARDS,
      subType: EventSubTypeRewards.REWARD_IN_PROGRESS,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
        link: 'link',
        beneficiary: '0xBeneficiary',
        tokenName: 'tokenName',
        tokenImage: 'tokenImage',
        tokenRarity: 'tokenRarity',
        tokenCategory: 'tokenCategory'
      }
    }

    expect(validateRewardInProgressEvent(event)).toEqual(true)
    expect(validateRewardInProgressEvent(null)).toEqual(false)
    expect(validateRewardInProgressEvent({})).toEqual(false)
  })

  it('CampaignOutOfFundsEvent static tests must pass', () => {
    const event: CampaignOutOfFundsEvent = {
      type: EventType.REWARDS,
      subType: EventSubTypeRewards.CAMPAIGN_OUT_OF_FUNDS,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
        link: 'link',
        owner: '0xOwner',
        campaignId: 'campaignId',
        campaignName: 'campaignName'
      }
    }

    expect(validateCampaignOutOfFundsEvent(event)).toEqual(true)
    expect(validateCampaignOutOfFundsEvent(null)).toEqual(false)
    expect(validateCampaignOutOfFundsEvent({})).toEqual(false)
  })

  it('CampaignGasPriceHigherThanExpectedEvent static tests must pass', () => {
    const event: CampaignGasPriceHigherThanExpectedEvent = {
      type: EventType.REWARDS,
      subType: EventSubTypeRewards.CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
        link: 'link',
        owner: '0xOwner',
        campaignId: 'campaignId',
        campaignName: 'campaignName'
      }
    }

    expect(validateCampaignGasPriceHigherThanExpectedEvent(event)).toEqual(true)
    expect(validateCampaignGasPriceHigherThanExpectedEvent(null)).toEqual(false)
    expect(validateCampaignGasPriceHigherThanExpectedEvent({})).toEqual(false)
  })

  it('CampaignOutOfStockEvent static tests must pass', () => {
    const event: CampaignOutOfStockEvent = {
      type: EventType.REWARDS,
      subType: EventSubTypeRewards.CAMPAIGN_OUT_OF_STOCK,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
        link: 'link',
        owner: '0xOwner',
        campaignId: 'campaignId',
        campaignName: 'campaignName'
      }
    }

    expect(validateCampaignOutOfStockEvent(event)).toEqual(true)
    expect(validateCampaignOutOfStockEvent(null)).toEqual(false)
    expect(validateCampaignOutOfStockEvent({})).toEqual(false)
  })

  it('RewardDelayedEvent static tests must pass', () => {
    const event: RewardDelayedEvent = {
      type: EventType.REWARDS,
      subType: EventSubTypeRewards.REWARD_DELAYED,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
        link: 'link',
        beneficiary: '0xBeneficiary',
        tokenName: 'tokenName',
        tokenImage: 'tokenImage',
        tokenRarity: 'tokenRarity',
        tokenCategory: 'tokenCategory'
      }
    }

    expect(validateRewardDelayedEvent(event)).toEqual(true)
    expect(validateRewardDelayedEvent(null)).toEqual(false)
    expect(validateRewardDelayedEvent({})).toEqual(false)
  })
})
