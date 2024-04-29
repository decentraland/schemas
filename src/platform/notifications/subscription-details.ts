import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/**
 * Types of notifications used inn the notifications-workers
 * @alpha
 */
export type NotificationMessageType =
  | 'governance_new_comment_on_project_update'
  | 'bid_accepted'
  | 'reward_assignment'
  | 'events_starts_soon'
  | 'royalties_earned'
  | 'rental_started'
  | 'governance_proposal_enacted'
  | 'governance_coauthor_requested'
  | 'worlds_access_restored'
  | 'worlds_missing_resources'
  | 'governance_authored_proposal_finished'
  | 'bid_received'
  | 'rental_ended'
  | 'governance_new_comment_on_proposal'
  | 'item_sold'
  | 'governance_voting_ended_voter'
  | 'events_started'

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
    [notificationType in NotificationMessageType]: NotificationChannelType
  }
}

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
        required: [
          'governance_new_comment_on_project_update',
          'bid_accepted',
          'reward_assignment',
          'events_starts_soon',
          'royalties_earned',
          'rental_started',
          'governance_proposal_enacted',
          'governance_coauthor_requested',
          'worlds_access_restored',
          'worlds_missing_resources',
          'governance_authored_proposal_finished',
          'bid_received',
          'rental_ended',
          'governance_new_comment_on_proposal',
          'item_sold',
          'governance_voting_ended_voter',
          'events_started'
        ],
        properties: {
          governance_new_comment_on_project_update: {
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
          },
          bid_accepted: {
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
          },
          reward_assignment: {
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
          },
          events_starts_soon: {
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
          },
          royalties_earned: {
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
          },
          rental_started: {
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
          },
          governance_proposal_enacted: {
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
          },
          governance_coauthor_requested: {
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
          },
          worlds_access_restored: {
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
          },
          worlds_missing_resources: {
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
          },
          governance_authored_proposal_finished: {
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
          },
          bid_received: {
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
          },
          rental_ended: {
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
          },
          governance_new_comment_on_proposal: {
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
          },
          item_sold: {
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
          },
          governance_voting_ended_voter: {
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
          },
          events_started: {
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
        }
      }
    }
  }
  export const validate: ValidateFunction<SubscriptionDetails> = generateLazyValidator(schema)
}
