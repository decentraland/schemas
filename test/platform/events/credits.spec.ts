import { expect } from 'expect'
import {
  CreditsClaimReminderEvent,
  CreditsCompleteGoalsReminderEvent,
  CreditsDoNotMissOutReminderEvent,
  CreditsGoalCompletedEvent,
  CreditsUsage24HoursReminderEvent,
  CreditsUsageReminderEvent,
  EventType,
  EventSubTypeCreditsService,
  creditsClaimReminderEventSchema,
  creditsCompleteGoalsReminderEventSchema,
  creditsDoNotMissOutReminderEventSchema,
  creditsGoalCompletedEventSchema,
  creditsUsage24HoursReminderEventSchema,
  creditsUsageReminderEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateCreditsClaimReminderEvent = generateLazyValidator(creditsClaimReminderEventSchema)
const validateCreditsCompleteGoalsReminderEvent = generateLazyValidator(creditsCompleteGoalsReminderEventSchema)
const validateCreditsDoNotMissOutReminderEvent = generateLazyValidator(creditsDoNotMissOutReminderEventSchema)
const validateCreditsGoalCompletedEvent = generateLazyValidator(creditsGoalCompletedEventSchema)
const validateCreditsUsage24HoursReminderEvent = generateLazyValidator(creditsUsage24HoursReminderEventSchema)
const validateCreditsUsageReminderEvent = generateLazyValidator(creditsUsageReminderEventSchema)

describe('Credits Events tests', () => {
  describe('CreditsGoalCompletedEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsGoalCompletedEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED,
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

      expect(validateCreditsGoalCompletedEvent(event)).toEqual(true)
      expect(validateCreditsGoalCompletedEvent(null)).toEqual(false)
      expect(validateCreditsGoalCompletedEvent({})).toEqual(false)
    })

    it('should fail with invalid creditsObtained', () => {
      const event: CreditsGoalCompletedEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED,
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

      expect(validateCreditsGoalCompletedEvent(event)).toEqual(false)
    })

    it('should fail with invalid seasonId', () => {
      const event: CreditsGoalCompletedEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED,
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

      expect(validateCreditsGoalCompletedEvent(event)).toEqual(false)
    })

    it('should fail with invalid weekNumber', () => {
      const event: CreditsGoalCompletedEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED,
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

      expect(validateCreditsGoalCompletedEvent(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CREDITS_GOAL_COMPLETED,
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

      expect(validateCreditsGoalCompletedEvent(event)).toEqual(false)
    })
  })

  describe('CreditsCompleteGoalsReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsCompleteGoalsReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 3,
          pendingGoalIds: ['goal-123', 'goal-456']
        }
      }

      expect(validateCreditsCompleteGoalsReminderEvent(event)).toEqual(true)
      expect(validateCreditsCompleteGoalsReminderEvent(null)).toEqual(false)
      expect(validateCreditsCompleteGoalsReminderEvent({})).toEqual(false)
    })

    it('should fail with invalid seasonId', () => {
      const event: CreditsCompleteGoalsReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 0, // Invalid season number
          weekNumber: 3,
          pendingGoalIds: ['goal-123', 'goal-456']
        }
      }

      expect(validateCreditsCompleteGoalsReminderEvent(event)).toEqual(false)
    })

    it('should fail with invalid weekNumber', () => {
      const event: CreditsCompleteGoalsReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 0, // Invalid week number
          pendingGoalIds: ['goal-123', 'goal-456']
        }
      }

      expect(validateCreditsCompleteGoalsReminderEvent(event)).toEqual(false)
    })

    it('should fail with empty pendingGoalIds', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 3,
          pendingGoalIds: []
        }
      }

      expect(validateCreditsCompleteGoalsReminderEvent(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.COMPLETE_GOALS_REMINDER,
        key: 'complete-goals-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          seasonId: 1,
          weekNumber: 3,
          pendingGoalIds: ['goal-123']
          // address missing
        }
      }

      expect(validateCreditsCompleteGoalsReminderEvent(event)).toEqual(false)
    })
  })

  describe('CreditsClaimReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsClaimReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 3
        }
      }

      expect(validateCreditsClaimReminderEvent(event)).toEqual(true)
      expect(validateCreditsClaimReminderEvent(null)).toEqual(false)
      expect(validateCreditsClaimReminderEvent({})).toEqual(false)
    })

    it('should fail with invalid seasonId', () => {
      const event: CreditsClaimReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 0, // Invalid season number
          weekNumber: 3
        }
      }

      expect(validateCreditsClaimReminderEvent(event)).toEqual(false)
    })

    it('should fail with invalid weekNumber', () => {
      const event: CreditsClaimReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          seasonId: 1,
          weekNumber: 0 // Invalid week number
        }
      }

      expect(validateCreditsClaimReminderEvent(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.CLAIM_CREDITS_REMINDER,
        key: 'claim-credits-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          seasonId: 1,
          weekNumber: 3
          // address missing
        }
      }

      expect(validateCreditsClaimReminderEvent(event)).toEqual(false)
    })
  })

  describe('CreditsUsageReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsUsageReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.USAGE_REMINDER,
        key: 'usage-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: 100,
          expirationDate: 'July 27 at 23:59 UTC',
          expirationDay: 'Sunday'
        }
      }

      expect(validateCreditsUsageReminderEvent(event)).toEqual(true)
      expect(validateCreditsUsageReminderEvent(null)).toEqual(false)
      expect(validateCreditsUsageReminderEvent({})).toEqual(false)
    })

    it('should fail with invalid creditsAmount', () => {
      const event: CreditsUsageReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.USAGE_REMINDER,
        key: 'usage-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: -1, // Invalid negative amount
          expirationDate: 'July 27 at 23:59 UTC',
          expirationDay: 'Sunday'
        }
      }

      expect(validateCreditsUsageReminderEvent(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.USAGE_REMINDER,
        key: 'usage-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          creditsAmount: 100,
          expirationDate: 'July 27 at 23:59 UTC',
          expirationDay: 'Sunday'
          // address missing
        }
      }

      expect(validateCreditsUsageReminderEvent(event)).toEqual(false)
    })
  })

  describe('CreditsUsage24HoursReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsUsage24HoursReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.USAGE_24_HOURS_REMINDER,
        key: 'usage-24-hours-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: 100,
          expirationDate: 'Sunday, July 27 at 23:59 UTC'
        }
      }

      expect(validateCreditsUsage24HoursReminderEvent(event)).toEqual(true)
      expect(validateCreditsUsage24HoursReminderEvent(null)).toEqual(false)
      expect(validateCreditsUsage24HoursReminderEvent({})).toEqual(false)
    })

    it('should fail with invalid creditsAmount', () => {
      const event: CreditsUsage24HoursReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.USAGE_24_HOURS_REMINDER,
        key: 'usage-24-hours-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
          creditsAmount: -1, // Invalid negative amount
          expirationDate: 'Sunday, July 27 at 23:59 UTC'
        }
      }

      expect(validateCreditsUsage24HoursReminderEvent(event)).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.USAGE_24_HOURS_REMINDER,
        key: 'usage-24-hours-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          creditsAmount: 100,
          expirationDate: 'Sunday, July 27 at 23:59 UTC'
          // address missing
        }
      }

      expect(validateCreditsUsage24HoursReminderEvent(event)).toEqual(false)
    })
  })

  describe('CreditsDoNotMissOutReminderEvent', () => {
    it('should pass validation with valid data', () => {
      const event: CreditsDoNotMissOutReminderEvent = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.DO_NOT_MISS_OUT_REMINDER,
        key: 'do-not-miss-out-reminder-123',
        timestamp: 1710234567890,
        metadata: {
          address: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
        }
      }

      expect(validateCreditsDoNotMissOutReminderEvent(event)).toEqual(true)
      expect(validateCreditsDoNotMissOutReminderEvent(null)).toEqual(false)
      expect(validateCreditsDoNotMissOutReminderEvent({})).toEqual(false)
    })

    it('should fail with missing address', () => {
      const event: any = {
        type: EventType.CREDITS_SERVICE,
        subType: EventSubTypeCreditsService.DO_NOT_MISS_OUT_REMINDER,
        key: 'do-not-miss-out-reminder-123',
        timestamp: 1710234567890,
        metadata: {}
        // address missing
      }

      expect(validateCreditsDoNotMissOutReminderEvent(event)).toEqual(false)
    })
  })
})
