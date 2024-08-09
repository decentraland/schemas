import expect from 'expect'
import { Events, RewardAssignedEvent, RewardInProgressEvent } from '../../../src'

describe('Rewards Events tests', () => {
  it('RewardInProgressEvent static tests must pass', () => {
    const event: RewardInProgressEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.REWARD_IN_PROGRESS,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
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

  it('RewardAssignedEvent static tests must pass', () => {
    const event: RewardAssignedEvent = {
      type: Events.Type.REWARDS,
      subType: Events.SubType.Rewards.REWARD_ASSIGNED,
      key: 'key',
      timestamp: 1,
      metadata: {
        title: 'title',
        description: 'description',
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
})
