import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { NotificationChannelType, NotificationType } from './notifications'

/**
 * Subscription details returned by the notifications-workers
 * @alpha
 */
export type SubscriptionDetails = {
  ignore_all_email: boolean
  ignore_all_in_app: boolean
  message_type: {
    [notificationType in NotificationType]: NotificationChannelType
  }
}

// Define the schema for NotificationChannelType
const NotificationChannelTypeSchema: JSONSchema<NotificationChannelType> = {
  type: 'object',
  required: ['email', 'in_app'],
  properties: {
    email: {
      type: 'boolean'
    },
    in_app: {
      type: 'boolean'
    }
  }
}

const messageTypeProperties = Object.values(NotificationType).reduce((properties, notificationType) => {
  properties[notificationType] = NotificationChannelTypeSchema
  return properties
}, {} as Record<NotificationType, typeof NotificationChannelTypeSchema>)

/**
 * Subscription details
 * @alpha
 */
export namespace SubscriptionDetails {
  export const schema: JSONSchema<SubscriptionDetails> = {
    type: 'object',
    required: ['ignore_all_email', 'ignore_all_in_app', 'message_type'],
    properties: {
      ignore_all_email: {
        type: 'boolean'
      },
      ignore_all_in_app: {
        type: 'boolean'
      },
      message_type: {
        type: 'object',
        required: Object.values(NotificationType), // All enum values are required
        additionalProperties: false, // No other properties are allowed
        properties: messageTypeProperties
      }
    }
  }

  export const validate: ValidateFunction<SubscriptionDetails> = generateLazyValidator(schema)
}
