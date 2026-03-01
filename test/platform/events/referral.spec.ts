import { expect } from 'expect'
import {
  EventType,
  EventSubTypeReferral,
  referralInvitedUsersAcceptedEventSchema,
  referralNewTierReachedEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

describe('Referral Events tests', () => {
  const testCases = [
    {
      name: 'ReferralInvitedUsersAcceptedEvent',
      eventSchema: referralInvitedUsersAcceptedEventSchema,
      subType: EventSubTypeReferral.REFERRAL_INVITED_USERS_ACCEPTED
    },
    {
      name: 'ReferralNewTierReachedEvent',
      eventSchema: referralNewTierReachedEventSchema,
      subType: EventSubTypeReferral.REFERRAL_NEW_TIER_REACHED
    }
  ]

  testCases.forEach(({ name, eventSchema, subType }) => {
    it(`${name} static tests must pass`, () => {
      const validate = generateLazyValidator(eventSchema)
      const event = {
        type: EventType.REFERRAL,
        subType,
        key: 'key',
        timestamp: 1,
        metadata: {
          title: 'Test Title',
          description: 'Test Description',
          address: '0x123',
          tier: 1,
          url: 'https://test.com',
          invitedUserAddress: '0x456',
          invitedUsers: 5,
          image: 'https://test.com/image.png'
        }
      }

      expect(validate(event)).toEqual(true)
      expect(validate(null)).toEqual(false)
      expect(validate({})).toEqual(false)
    })
  })
})
