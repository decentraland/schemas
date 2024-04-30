import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

export enum NotificationType {
  GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE = 'governance_new_comment_on_project_update',
  BID_ACCEPTED = 'bid_accepted',
  REWARD_ASSIGNMENT = 'reward_assignment',
  EVENTS_STARTS_SOON = 'events_starts_soon',
  ROYALTIES_EARNED = 'royalties_earned',
  RENTAL_STARTED = 'rental_started',
  GOVERNANCE_PROPOSAL_ENACTED = 'governance_proposal_enacted',
  GOVERNANCE_COAUTHOR_REQUESTED = 'governance_coauthor_requested',
  WORLDS_ACCESS_RESTORED = 'worlds_access_restored',
  WORLDS_MISSING_RESOURCES = 'worlds_missing_resources',
  GOVERNANCE_AUTHORED_PROPOSAL_FINISHED = 'governance_authored_proposal_finished',
  BID_RECEIVED = 'bid_received',
  RENTAL_ENDED = 'rental_ended',
  GOVERNANCE_NEW_COMMENT_ON_PROPOSAL = 'governance_new_comment_on_proposal',
  ITEM_SOLD = 'item_sold',
  GOVERNANCE_VOTING_ENDED_VOTER = 'governance_voting_ended_voter',
  EVENTS_STARTED = 'events_started'
}


/**
 * The medium/channel used to send the notification
 * @alpha
 */
export type NotificationChannelType = {
  email: boolean
  in_app: boolean
}

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
