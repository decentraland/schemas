import expect from 'expect'
import { ReferralInvitedUsersAcceptedEvent, ReferralNewTierReachedEvent, Events } from '../../../src'

describe('Streaming Events tests', () => {
  const testCases = [
    {
      name: 'ReferralInvitedUsersAcceptedEvent',
      eventClass: ReferralInvitedUsersAcceptedEvent,
      subType: Events.SubType.Referral.REFERRAL_INVITED_USERS_ACCEPTED
    },
    {
      name: 'ReferralNewTierReachedEvent',
      eventClass: ReferralNewTierReachedEvent,
      subType: Events.SubType.Referral.REFERRAL_NEW_TIER_REACHED
    }
  ]

  testCases.forEach(({ name, eventClass, subType }) => {
    it(`${name} static tests must pass`, () => {
      const event = {
        type: Events.Type.REFERRAL,
        subType,
        key: 'key',
        timestamp: 1,
        metadata: {
          title: 'Test Title',
          description: 'Test Description',
          address: '0x123',
          tier: 'tier 1',
          url: 'https://test.com',
          invitedUsers: '5',
          image: 'https://test.com/image.png'
        }
      }

      expect(eventClass.validate(event)).toEqual(true)
      expect(eventClass.validate(null)).toEqual(false)
      expect(eventClass.validate({})).toEqual(false)
    })
  })
})
