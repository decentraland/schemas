import expect from 'expect'
import {
  CreditsClaimReminderEvent,
  CreditsCompleteGoalsReminderEvent,
  CreditsDoNotMissOutReminderEvent,
  CreditsGoalCompletedEvent,
  CreditsUsage24HoursReminderEvent,
  CreditsUsageReminderEvent,
  Events
} from '../../../src'

describe('Credits Events tests', () => {
  describe('CreditsGoalCompletedEvent', () => {
    it('should pass validation with valid data', () => {
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

    it('should fail with invalid creditsObtained', () => {
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

    it('should fail with invalid seasonId', () => {
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

    it('should fail with invalid weekNumber', () => {
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

    it('should fail with missing address', () => {
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
          // address missing
        }
      }

      expect(CreditsGoalCompletedEvent.validate(event)).toEqual(false)
    })
  })

  describe('CreditsCompleteGoalsReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsCompleteGoalsReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 3,
          pendingGoalIds: ['goal-123', 'goal-456']
        }
      }

      expect(CreditsCompleteGoalsReminderEvent.validate(event)).toEqual(true)
      expect(CreditsCompleteGoalsReminderEvent.validate(null)).toEqual(false)
      expect(CreditsCompleteGoalsReminderEvent.validate({})).toEqual(false)
    })

    it('should fail with invalid seasonId', () => {
      const event: CreditsCompleteGoalsReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 0, // Invalid season number
          weekNumber: 3,
          pendingGoalIds: ['goal-123', 'goal-456']
        }
      }

      expect(CreditsCompleteGoalsReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with invalid weekNumber', () => {
      const event: CreditsCompleteGoalsReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 0, // Invalid week number
          pendingGoalIds: ['goal-123', 'goal-456']
        }
      }

      expect(CreditsCompleteGoalsReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with empty pendingGoalIds', () => {
      const event: any = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 3,
          pendingGoalIds: []
        }
      }

      expect(CreditsCompleteGoalsReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          seasonId: 1,
          weekNumber: 3,
          pendingGoalIds: ['goal-123']
          // address missing
        }
      }

      expect(CreditsCompleteGoalsReminderEvent.validate(event)).toEqual(false)
    })
  })

  describe('CreditsClaimReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsClaimReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 3
        }
      }

      expect(CreditsClaimReminderEvent.validate(event)).toEqual(true)
      expect(CreditsClaimReminderEvent.validate(null)).toEqual(false)
      expect(CreditsClaimReminderEvent.validate({})).toEqual(false)
    })

    it('should fail with invalid seasonId', () => {
      const event: CreditsClaimReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 0, // Invalid season number
          weekNumber: 3
        }
      }

      expect(CreditsClaimReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with invalid weekNumber', () => {
      const event: CreditsClaimReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 0 // Invalid week number
        }
      }

      expect(CreditsClaimReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          seasonId: 1,
          weekNumber: 3
          // address missing
        }
      }

      expect(CreditsClaimReminderEvent.validate(event)).toEqual(false)
    })
  })

  describe('CreditsUsageReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsUsageReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.USAGE_REMINDER,
        key: 'usage-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: 100,
          expirationDate: 'July 27 at 23:59 UTC',
          expirationDay: 'Sunday'
        }
      }

      expect(CreditsUsageReminderEvent.validate(event)).toEqual(true)
      expect(CreditsUsageReminderEvent.validate(null)).toEqual(false)
      expect(CreditsUsageReminderEvent.validate({})).toEqual(false)
    })

    it('should fail with invalid creditsAmount', () => {
      const event: CreditsUsageReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.USAGE_REMINDER,
        key: 'usage-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: -1, // Invalid negative amount
          expirationDate: 'July 27 at 23:59 UTC',
          expirationDay: 'Sunday'
        }
      }

      expect(CreditsUsageReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.USAGE_REMINDER,
        key: 'usage-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          creditsAmount: 100,
          expirationDate: 'July 27 at 23:59 UTC',
          expirationDay: 'Sunday'
          // address missing
        }
      }

      expect(CreditsUsageReminderEvent.validate(event)).toEqual(false)
    })
  })

  describe('CreditsUsage24HoursReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsUsage24HoursReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.USAGE_24_HOURS_REMINDER,
        key: 'usage-24-hours-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: 100,
          expirationDate: 'Sunday, July 27 at 23:59 UTC'
        }
      }

      expect(CreditsUsage24HoursReminderEvent.validate(event)).toEqual(true)
      expect(CreditsUsage24HoursReminderEvent.validate(null)).toEqual(false)
      expect(CreditsUsage24HoursReminderEvent.validate({})).toEqual(false)
    })

    it('should fail with invalid creditsAmount', () => {
      const event: CreditsUsage24HoursReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.USAGE_24_HOURS_REMINDER,
        key: 'usage-24-hours-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: -1, // Invalid negative amount
          expirationDate: 'Sunday, July 27 at 23:59 UTC'
        }
      }

      expect(CreditsUsage24HoursReminderEvent.validate(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.USAGE_24_HOURS_REMINDER,
        key: 'usage-24-hours-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          creditsAmount: 100,
          expirationDate: 'Sunday, July 27 at 23:59 UTC'
          // address missing
        }
      }

      expect(CreditsUsage24HoursReminderEvent.validate(event)).toEqual(false)
    })
  })

  describe('CreditsDoNotMissOutReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsDoNotMissOutReminderEvent = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.DO_NOT_MISS_OUT_REMINDER,
        key: 'do-not-miss-out-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
        }
      }

      expect(CreditsDoNotMissOutReminderEvent.validate(event)).toEqual(true)
      expect(CreditsDoNotMissOutReminderEvent.validate(null)).toEqual(false)
      expect(CreditsDoNotMissOutReminderEvent.validate({})).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: Events.Type.CREDITS_SERVICE,
        subType: Events.SubType.CreditsService.DO_NOT_MISS_OUT_REMINDER,
        key: 'do-not-miss-out-reminder-123',
        timestamp: 1710234567890,
        metadata: {}
        // address missing
      }

      expect(CreditsDoNotMissOutReminderEvent.validate(event)).toEqual(false)
    })
  })
})
