import { expect } from 'expect'
import { testTypeSignature } from '../../test-utils'
import { NotificationType, subscriptionDetailsSchema } from '../../../src'
import { subscriptionDetails } from './subscription.spec'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateSubscriptionDetails = generateLazyValidator(subscriptionDetailsSchema)

describe('Subscription details tests', () => {
  testTypeSignature({ schema: subscriptionDetailsSchema }, subscriptionDetails)

  it('static tests must pass', () => {
    expect(validateSubscriptionDetails(subscriptionDetails)).toEqual(true)
    expect(validateSubscriptionDetails(null)).toEqual(false)
    expect(validateSubscriptionDetails({})).toEqual(false)
    expect(validateSubscriptionDetails.errors).toEqual([
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
      validateSubscriptionDetails({
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

    expect(validateSubscriptionDetails.errors).toEqual(errors)
  })
})
