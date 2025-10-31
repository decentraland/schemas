import expect from 'expect'
import {
  CampaignOutOfFundsEvent,
  CampaignGasPriceHigherThanExpectedEvent,
  CampaignOutOfStockEvent,
  Events,
  RewardAssignedEvent,
  RewardDelayedEvent,
  RewardInProgressEvent
} from '../../../src'

describe('Rewards Events tests', () => {
  it('RewardAssignedEvent static tests must pass', () => {
    const event: RewardAssignedEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.REWARD_ASSIGNED,
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

    expect(RewardAssignedEvent.validate(event)).toEqual(true)
    expect(RewardAssignedEvent.validate(null)).toEqual(false)
    expect(RewardAssignedEvent.validate({})).toEqual(false)
  })

  it('RewardInProgressEvent static tests must pass', () => {
    const event: RewardInProgressEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.REWARD_IN_PROGRESS,
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

    expect(RewardInProgressEvent.validate(event)).toEqual(true)
    expect(RewardInProgressEvent.validate(null)).toEqual(false)
    expect(RewardInProgressEvent.validate({})).toEqual(false)
  })

  it('CampaignOutOfFundsEvent static tests must pass', () => {
    const event: CampaignOutOfFundsEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.CAMPAIGN_OUT_OF_FUNDS,
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

    expect(CampaignOutOfFundsEvent.validate(event)).toEqual(true)
    expect(CampaignOutOfFundsEvent.validate(null)).toEqual(false)
    expect(CampaignOutOfFundsEvent.validate({})).toEqual(false)
  })

  it('CampaignGasPriceHigherThanExpectedEvent static tests must pass', () => {
    const event: CampaignGasPriceHigherThanExpectedEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED,
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

    expect(CampaignGasPriceHigherThanExpectedEvent.validate(event)).toEqual(true)
    expect(CampaignGasPriceHigherThanExpectedEvent.validate(null)).toEqual(false)
    expect(CampaignGasPriceHigherThanExpectedEvent.validate({})).toEqual(false)
  })

  it('CampaignOutOfStockEvent static tests must pass', () => {
    const event: CampaignOutOfStockEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.CAMPAIGN_OUT_OF_STOCK,
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

    expect(CampaignOutOfStockEvent.validate(event)).toEqual(true)
    expect(CampaignOutOfStockEvent.validate(null)).toEqual(false)
    expect(CampaignOutOfStockEvent.validate({})).toEqual(false)
  })

  it('RewardDelayedEvent static tests must pass', () => {
    const event: RewardDelayedEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.REWARD_DELAYED,
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

    expect(RewardDelayedEvent.validate(event)).toEqual(true)
    expect(RewardDelayedEvent.validate(null)).toEqual(false)
    expect(RewardDelayedEvent.validate({})).toEqual(false)
  })
})
