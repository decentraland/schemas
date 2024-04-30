import expect from 'expect'
import { testTypeSignature } from '../../test-utils'
import { SubscriptionDetails } from '../../../src'
import { subscriptionDetails } from './subscription.spec'

describe('Subscription details tests', () => {
  testTypeSignature(SubscriptionDetails, subscriptionDetails)

  it('static tests must pass', () => {
    expect(SubscriptionDetails.validate(subscriptionDetails)).toEqual(true)
    expect(SubscriptionDetails.validate(null)).toEqual(false)
    expect(SubscriptionDetails.validate({})).toEqual(false)
    expect(SubscriptionDetails.validate.errors).toEqual([
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'ignore_all_email'",
        params: { missingProperty: 'ignore_all_email' },
        schemaPath: '#/required'
      },
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'ignore_all_in_app'",
        params: { missingProperty: 'ignore_all_in_app' },
        schemaPath: '#/required'
      },
      {
        instancePath: '',
        keyword: 'required',
        message: "must have required property 'message_type'",
        params: { missingProperty: 'message_type' },
        schemaPath: '#/required'
      }
    ])
  })

  it('name, if present, must be a string', () => {
    expect(
      SubscriptionDetails.validate({
        ignore_all_email: true,
        ignore_all_in_app: false,
        message_type: {
          governance_new_comment_on_project_update: { email: true, in_app: true },
          bid_accepted: { email: true, in_app: true }
        }
      })
    ).toBeFalsy()
    expect(SubscriptionDetails.validate.errors).toMatchObject([
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'reward_assignment'",
        params: {
          missingProperty: 'reward_assignment'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'events_starts_soon'",
        params: {
          missingProperty: 'events_starts_soon'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'royalties_earned'",
        params: {
          missingProperty: 'royalties_earned'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'rental_started'",
        params: {
          missingProperty: 'rental_started'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'governance_proposal_enacted'",
        params: {
          missingProperty: 'governance_proposal_enacted'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'governance_coauthor_requested'",
        params: {
          missingProperty: 'governance_coauthor_requested'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'worlds_access_restored'",
        params: {
          missingProperty: 'worlds_access_restored'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'worlds_missing_resources'",
        params: {
          missingProperty: 'worlds_missing_resources'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'governance_authored_proposal_finished'",
        params: {
          missingProperty: 'governance_authored_proposal_finished'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'bid_received'",
        params: {
          missingProperty: 'bid_received'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'rental_ended'",
        params: {
          missingProperty: 'rental_ended'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'governance_new_comment_on_proposal'",
        params: {
          missingProperty: 'governance_new_comment_on_proposal'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'item_sold'",
        params: {
          missingProperty: 'item_sold'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'governance_voting_ended_voter'",
        params: {
          missingProperty: 'governance_voting_ended_voter'
        },
        schemaPath: '#/properties/message_type/required'
      },
      {
        instancePath: '/message_type',
        keyword: 'required',
        message: "must have required property 'events_started'",
        params: {
          missingProperty: 'events_started'
        },
        schemaPath: '#/properties/message_type/required'
      }
    ])
  })
})
