import { expect } from 'expect'
import { testTypeSignature } from '../../test-utils'
import type { SubscriptionDetails } from '../../../src'
import { NotificationChannelType, NotificationType, subscriptionSchema } from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateSubscription = generateLazyValidator(subscriptionSchema)

const messageTypes = Object.values(NotificationType).reduce((properties, notificationType) => {
  properties[notificationType] = { email: true, in_app: true }
  return properties
}, {} as Record<NotificationType, NotificationChannelType>)

export const subscriptionDetails: SubscriptionDetails = {
  ignore_all_email: true,
  ignore_all_in_app: false,
  message_type: messageTypes
}

const subscription = {
  address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
  email: 'email@example.org',
  details: subscriptionDetails
}

describe('Subscription tests', () => {
  testTypeSignature({ schema: subscriptionSchema }, subscription)

  it('static tests must pass', () => {
    expect(validateSubscription(subscription)).toBeTruthy()
    expect(validateSubscription(null)).toBeFalsy()
    expect(validateSubscription({})).toBeFalsy()
    expect(validateSubscription.errors).toEqual([
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
      validateSubscription({
        address: '0x13a',
        details: subscriptionDetails
      })
    ).toBeFalsy()
    expect(validateSubscription.errors).toMatchObject([
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
      validateSubscription({
        address: '0x13a088C9ae5028C55F8E1cd5A13dc8134b062d50',
        email: 'not-an-email',
        details: subscriptionDetails
      })
    ).toBeFalsy()
    expect(validateSubscription.errors).toMatchObject([
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
