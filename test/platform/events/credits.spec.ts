import expect from 'expect'
import { CreditsGoalCompletedEvent, Events } from '../../../src'

describe('CreditsGoalCompleted Events tests', () => {
  it('CreditsGoalCompletedEvent static tests must pass', () => {
    const event: CreditsGoalCompletedEvent = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'key',
      timestamp: 1,
      metadata: {
        goalId: 'baf',
        creditsAmount: 1
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(true)
    expect(CreditsGoalCompletedEvent.validate(null)).toEqual(false)
    expect(CreditsGoalCompletedEvent.validate({})).toEqual(false)
  })
})

describe('CreditsGoalCompletedEvent Events tests', () => {
  it('CreditsGoalCompletedEvent static tests must pass', () => {
    const event: CreditsGoalCompletedEvent = {
      type: Events.Type.CREDITS_SERVICE,
      subType: Events.SubType.CreditsService.CREDITS_GOAL_COMPLETED,
      key: 'key',
      timestamp: 1,
      metadata: {
        goalId: 'baf',
        creditsAmount: 1
      }
    }

    expect(CreditsGoalCompletedEvent.validate(event)).toEqual(true)
    expect(CreditsGoalCompletedEvent.validate(null)).toEqual(false)
    expect(CreditsGoalCompletedEvent.validate({})).toEqual(false)
  })
})
