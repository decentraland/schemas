/**
 * Notification Types (the keys as stored in the notifications DB)
 * @alpha
 */
export enum NotificationType {
  BADGE_GRANTED = 'badge_granted',
  BID_ACCEPTED = 'bid_accepted',
  BID_RECEIVED = 'bid_received',
  EVENTS_STARTED = 'events_started',
  EVENTS_STARTS_SOON = 'events_starts_soon',
  GOVERNANCE_ANNOUNCEMENT = 'governance_announcement',
  GOVERNANCE_AUTHORED_PROPOSAL_FINISHED = 'governance_authored_proposal_finished',
  GOVERNANCE_COAUTHOR_REQUESTED = 'governance_coauthor_requested',
  GOVERNANCE_CLIFF_ENDED = 'governance_cliff_ended',
  GOVERNANCE_NEW_COMMENT_ON_PROJECT_UPDATE = 'governance_new_comment_on_project_update',
  GOVERNANCE_NEW_COMMENT_ON_PROPOSAL = 'governance_new_comment_on_proposal',
  GOVERNANCE_PROPOSAL_ENACTED = 'governance_proposal_enacted',
  GOVERNANCE_VOTING_ENDED_VOTER = 'governance_voting_ended_voter',
  GOVERNANCE_PITCH_PASSED = 'governance_pitch_passed',
  GOVERNANCE_TENDER_PASSED = 'governance_tender_passed',
  GOVERNANCE_WHALE_VOTE = 'governance_whale_vote',
  GOVERNANCE_VOTED_ON_BEHALF = 'governance_voted_on_behalf',
  ITEM_SOLD = 'item_sold',
  ITEM_PUBLISHED = 'item_published',
  LAND_RENTAL_ENDED = 'rental_ended',
  LAND_RENTED = 'rental_started',
  REWARD_ASSIGNED = 'reward_assignment',
  REWARD_CAMPAIGN_OUT_OF_FUNDS = 'reward_campaign_out_of_funds',
  REWARD_CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED = 'reward_campaign_gas_price_higher_than_expected',
  REWARD_CAMPAIGN_OUT_OF_STOCK = 'reward_campaign_out_of_stock',
  REWARD_DELAYED = 'reward_delayed',
  REWARD_IN_PROGRESS = 'reward_in_progress',
  ROYALTIES_EARNED = 'royalties_earned',
  SOCIAL_SERVICE_FRIENDSHIP_REQUEST = 'social_service_friendship_request',
  SOCIAL_SERVICE_FRIENDSHIP_ACCEPTED = 'social_service_friendship_accepted',
  WORLDS_ACCESS_RESTORED = 'worlds_access_restored',
  WORLDS_ACCESS_RESTRICTED = 'worlds_access_restricted',
  WORLDS_MISSING_RESOURCES = 'worlds_missing_resources',
  WORLDS_PERMISSION_GRANTED = 'worlds_permission_granted',
  WORLDS_PERMISSION_REVOKED = 'worlds_permission_revoked',
  CREDITS_GOAL_COMPLETED = 'credits_goal_completed',
  STREAMING_KEY_RESET = 'streaming_key_reset',
  STREAMING_KEY_REVOKE = 'streaming_key_revoke',
  STREAMING_KEY_EXPIRED = 'streaming_key_expired',
  STREAMING_TIME_EXCEEDED = 'streaming_time_exceeded',
  STREAMING_PLACE_UPDATED = 'streaming_place_updated',
  CREDITS_REMINDER_COMPLETE_GOALS = 'credits_reminder_complete_goals',
  CREDITS_REMINDER_CLAIM_CREDITS = 'credits_reminder_claim_credits',
  CREDITS_REMINDER_USAGE = 'credits_reminder_usage',
  CREDITS_REMINDER_USAGE_24_HOURS = 'credits_reminder_usage_24_hours',
  CREDITS_REMINDER_DO_NOT_MISS_OUT = 'credits_reminder_do_not_miss_out',
  REFERRAL_INVITED_USERS_ACCEPTED = 'referral_invited_users_accepted',
  REFERRAL_NEW_TIER_REACHED = 'referral_new_tier_reached'
}

/**
 * The channel used for sending the notification
 * @alpha
 */
export type NotificationChannelType = {
  email: boolean
  in_app: boolean
}
