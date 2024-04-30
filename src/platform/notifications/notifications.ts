/**
 * Notification Types (the keys as stored in the notifications DB)
 * @alpha
 */
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
 * The channel used for sending the notification
 * @alpha
 */
export type NotificationChannelType = {
  email: boolean
  in_app: boolean
}
