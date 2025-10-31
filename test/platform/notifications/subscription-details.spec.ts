import expect from 'expect'
import { testTypeSignature } from '../../test-utils'
import { NotificationType, SubscriptionDetails } from '../../../src'
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
        message_type: {}
      })
    ).toBeFalsy()
    const errors: any[] = Object.values(NotificationType).map((notificationType) => ({
      instancePath: '/message_type',
      keyword: 'required',
      message: `must have required property '${notificationType}'`,
      params: {
        missingProperty: notificationType
      },
      schemaPath: '#/properties/message_type/required'
    }))

    expect(SubscriptionDetails.validate.errors).toEqual(errors)
  })
})
