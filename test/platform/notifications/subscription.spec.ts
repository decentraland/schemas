import expect from 'expect'
import { testTypeSignature } from '../../test-utils'
import { NotificationType, Subscription, SubscriptionDetails } from '../../../src'

export const subscriptionDetails: SubscriptionDetails = {
  ignore_all_email: true,
  ignore_all_in_app: false,
  message_type: {
    [NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE]: { email: true, in_app: true },
    [NotificationType.BID_ACCEPTED]: { email: true, in_app: true },
    [NotificationType.REWARD_ASSIGNMENT]: { email: true, in_app: true },
    [NotificationType.EVENTS_STARTS_SOON]: { email: true, in_app: true },
    [NotificationType.ROYALTIES_EARNED]: { email: true, in_app: true },
    [NotificationType.RENTAL_STARTED]: { email: true, in_app: true },
    [NotificationType.GOVERNANCE_PROPOSAL_ENACTED]: { email: true, in_app: true },
    [NotificationType.GOVERNANCE_COAUTHOR_REQUESTED]: { email: true, in_app: true },
    [NotificationType.WORLDS_ACCESS_RESTORED]: { email: true, in_app: true },
    [NotificationType.WORLDS_MISSING_RESOURCES]: { email: true, in_app: true },
    [NotificationType.GOVERNANCE_AUTHORED_PROPOSAL_FINISHED]: { email: true, in_app: true },
    [NotificationType.BID_RECEIVED]: { email: true, in_app: true },
    [NotificationType.RENTAL_ENDED]: { email: true, in_app: true },
    [NotificationType.GOVERNANCE_NEW_COMMENT_ON_PROPOSAL]: { email: true, in_app: true },
    [NotificationType.ITEM_SOLD]: { email: true, in_app: true },
    [NotificationType.GOVERNANCE_VOTING_ENDED_VOTER]: { email: true, in_app: true },
    [NotificationType.EVENTS_STARTED]: { email: true, in_app: true }
  }
}

const subscription = {
  address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
  email: 'email@example.org',
  details: subscriptionDetails
}

describe('Subscription tests', () => {
  testTypeSignature(Subscription, subscription)

  it('static tests must pass', () => {
    expect(Subscription.validate(subscription)).toEqual(true)
    expect(Subscription.validate(null)).toEqual(false)
    expect(Subscription.validate({})).toEqual(false)
    expect(Subscription.validate.errors).toEqual([
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'address'",
        params: { missingProperty: 'address' },
        schemaPath: '#/required'
      },
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'details'",
        params: { missingProperty: 'details' },
        schemaPath: '#/required'
      }
    ])
  })

  it('address must be present and be an ethereum address', () => {
    expect(
      Subscription.validate({
        address: '0x13a',
        details: subscriptionDetails
      })
    ).toBeFalsy()
    expect(Subscription.validate.errors).toMatchObject([
      {
        instancePath: '/address',
        keyword: 'pattern',
        message: 'must match pattern "^0x[a-fA-F0-9]{40}$"',
        params: {
          pattern: '^0x[a-fA-F0-9]{40}$'
        },
        schemaPath: '#/properties/address/pattern'
      }
    ])
  })

  it('email, if present, must be a valid email address', () => {
    expect(
      Subscription.validate({
        address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
        email: 'not-an-email',
        details: subscriptionDetails
      })
    ).toBeFalsy()
    expect(Subscription.validate.errors).toMatchObject([
      {
        instancePath: '/email',
        keyword: 'pattern',
        message: 'must match pattern "^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$"',
        params: {
          pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$'
        },
        schemaPath: '#/properties/email/pattern'
      }
    ])
  })
})
