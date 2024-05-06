/**
 * Notification Types (the keys as stored in the notifications DB)
 * @alpha
 */
export enum NotificationType {
  BID_ACCEPTED = 'bid_accepted',
  BID_RECEIVED = 'bid_received',
  EVENTS_STARTED = 'events_started',
  EVENTS_STARTS_SOON = 'events_starts_soon',
  GOVERNANCE_ANNOUNCEMENT = 'governance_announcement',
  GOVERNANCE_AUTHORED_PROPOSAL_FINISHED = 'governance_authored_proposal_finished',
  GOVERNANCE_COAUTHOR_REQUESTED = 'governance_coauthor_requested',
  GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE = 'governance_new_comment_on_project_update',
  GOVERNANCE_NEW_COMMENT_ON_PROPOSAL = 'governance_new_comment_on_proposal',
  GOVERNANCE_PROPOSAL_ENACTED = 'governance_proposal_enacted',
  GOVERNANCE_VOTING_ENDED_VOTER = 'governance_voting_ended_voter',
  ITEM_SOLD = 'item_sold',
  LAND_RENTAL_ENDED = 'rental_ended',
  LAND_RENTED = 'rental_started',
  REWARD_ASSIGNED = 'rewards_assignment',
  ROYALTIES_EARNED = 'royalties_earned',
  WORLDS_ACCESS_RESTORED = 'worlds_access_restored',
  WORLDS_ACCESS_RESTRICTED = 'worlds_access_restricted',
  WORLDS_MISSING_RESOURCES = 'worlds_missing_resources',
  WORLDS_PERMISSION_GRANTED = 'worlds_permission_granted',
  WORLDS_PERMISSION_REVOKED = 'worlds_permission_revoked'
}

/**
 * The channel used for sending the notification
 * @alpha
 */
export type NotificationChannelType = {
  email: boolean
  in_app: boolean
}
