import expect from 'expect'
import { testTypeSignature } from '../../test-utils'
import { NotificationChannelType, NotificationType, Subscription, SubscriptionDetails } from '../../../src'

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
  testTypeSignature(Subscription, subscription)

  it('static tests must pass', () => {
    expect(Subscription.validate(subscription)).toBeTruthy()
    expect(Subscription.validate(null)).toBeFalsy()
    expect(Subscription.validate({})).toBeFalsy()
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
