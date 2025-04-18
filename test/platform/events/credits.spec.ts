import expect from 'expect'
import { CreditsGoalCompletedEvent, Events } from '../../../src'

describe('Credits Events tests', () => {
  it('CreditsGoalCompletedEvent static tests must pass', () => {
    const event: CreditsGoalCompletedEvent = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'goal-completion-123',
      timestamp: 1710234567890,
      metadata: {
        goalId: 'goal-123',
        creditsObtained: 100,
        seasonId: 1,
        weekNumber: 3,
        address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(true)
    expect(CreditsGoalCompletedEvent.validate(null)).toEqual(false)
    expect(CreditsGoalCompletedEvent.validate({})).toEqual(false)
  })

  it('CreditsGoalCompletedEvent should fail with invalid creditsObtained', () => {
    const event: CreditsGoalCompletedEvent = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'goal-completion-123',
      timestamp: 1710234567890,
      metadata: {
        goalId: 'goal-123',
        creditsObtained: -1, // Invalid negative amount
        seasonId: 1,
        weekNumber: 3,
        address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(false)
  })

  it('CreditsGoalCompletedEvent should fail with invalid seasonId', () => {
    const event: CreditsGoalCompletedEvent = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'goal-completion-123',
      timestamp: 1710234567890,
      metadata: {
        goalId: 'goal-123',
        creditsObtained: 100,
        seasonId: 0, // Invalid season number
        weekNumber: 3,
        address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(false)
  })

  it('CreditsGoalCompletedEvent should fail with invalid weekNumber', () => {
    const event: CreditsGoalCompletedEvent = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'goal-completion-123',
      timestamp: 1710234567890,
      metadata: {
        goalId: 'goal-123',
        creditsObtained: 100,
        seasonId: 1,
        weekNumber: 0, // Invalid week number
        address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(false)
  })

  it('CreditsGoalCompletedEvent should fail with missing userAddress', () => {
    const event: any = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'goal-completion-123',
      timestamp: 1710234567890,
      metadata: {
        goalId: 'goal-123',
        creditsObtained: 100,
        seasonId: 1,
        weekNumber: 3
        // userAddress missing
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(false)
  })
})
