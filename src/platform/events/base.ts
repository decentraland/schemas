import {
  BidAcceptedEvent,
  CollectionCreatedEvent,
  ItemPublishedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent,
  TipReceivedEvent,
  TransferReceivedEvent
} from './blockchain.js'
import { CatalystDeploymentEvent } from './catalyst.js'
import {
  LoggedInCachedEvent,
  LoggedInEvent,
  MoveToParcelEvent,
  PassportOpenedEvent,
  UsedEmoteEvent,
  VerticalHeightReachedEvent,
  WalkedDistanceEvent
} from './client.js'
import { UserJoinedRoomEvent, UserLeftRoomEvent, UserBannedFromSceneEvent, UserUnbannedFromSceneEvent } from './comms.js'
import {
  CommunityDeletedEvent,
  CommunityDeletedContentViolationEvent,
  CommunityInviteReceivedEvent,
  CommunityMemberBannedEvent,
  CommunityMemberLeftEvent,
  CommunityMemberRemovedEvent,
  CommunityRenamedEvent,
  CommunityRequestToJoinAcceptedEvent,
  CommunityRequestToJoinReceivedEvent,
  CommunityOwnershipTransferredEvent,
  CommunityPostAddedEvent,
  CommunityVoiceChatStartedEvent
} from './communities.js'
import { BidReceivedEvent } from './marketplace.js'
import { PhotoPrivacyChangedEvent, PhotoTakenEvent } from './camera.js'
import { ReferralInvitedUsersAcceptedEvent, ReferralNewTierReachedEvent } from './referral.js'
import {
  RewardInProgressEvent,
  RewardAssignedEvent,
  CampaignOutOfFundsEvent,
  CampaignGasPriceHigherThanExpectedEvent,
  CampaignOutOfStockEvent,
  RewardDelayedEvent
} from './rewards.js'
import {
  BadgeGrantedEvent,
  CreditsClaimReminderEvent,
  CreditsCompleteGoalsReminderEvent,
  CreditsDoNotMissOutReminderEvent,
  CreditsGoalCompletedEvent,
  CreditsUsage24HoursReminderEvent,
  CreditsOnDemandEvent,
  CreditsUsageReminderEvent,
  FriendshipAcceptedEvent,
  FriendshipRequestEvent,
  CreditsNewSeasonReminderEvent
} from './services.js'
import {
  StreamingKeyResetEvent,
  StreamingKeyRevokeEvent,
  StreamingKeyExpiredEvent,
  StreamingTimeExceededEvent,
  StreamingPlaceUpdatedEvent,
  CommunityStreamingEndedEvent
} from './streaming.js'
import { AuthIdentifyEvent } from './web.js'
import { EventCreatedEvent, EventStartedEvent, EventStartsSoonEvent, EventEndedEvent } from './event.js'
import {
  GovernanceProposalEnactedEvent,
  GovernanceCoauthorRequestedEvent,
  GovernancePitchPassedEvent,
  GovernanceTenderPassedEvent,
  GovernanceAuthoredProposalFinishedEvent,
  GovernanceVotingEndedVoterEvent,
  GovernanceNewCommentOnProposalEvent,
  GovernanceNewCommentOnProjectUpdatedEvent,
  GovernanceWhaleVoteEvent,
  GovernanceVotedOnBehalfEvent,
  GovernanceCliffEndedEvent
} from './governance.js'
import {
  WorldsPermissionGrantedEvent,
  WorldsPermissionRevokedEvent,
  WorldsAccessRestoredEvent,
  WorldsAccessRestrictedEvent,
  WorldsMissingResourcesEvent
} from './world.js'

export enum EventType {
  BLOCKCHAIN = 'blockchain',
  CATALYST_DEPLOYMENT = 'catalyst-deployment',
  WORLD = 'world',
  CLIENT = 'client',
  WEB = 'web',
  MARKETPLACE = 'marketplace',
  REWARDS = 'rewards',
  BADGE = 'badge',
  ASSET_BUNDLE = 'asset-bundle',
  SOCIAL_SERVICE = 'social-service',
  CREDITS_SERVICE = 'credits-service',
  STREAMING = 'streaming',
  COMMS = 'comms',
  REFERRAL = 'referral',
  COMMUNITY = 'community',
  CAMERA = 'camera',
  EVENT = 'event',
  GOVERNANCE = 'governance'
}

export enum EventSubTypeBlockchain {
  BID_ACCEPTED = 'bid-accepted',
  ITEM_SOLD = 'item-sold',
  RENTAL_ENDED = 'land-rental-ended',
  RENTAL_STARTED = 'land-rental-started',
  ROYALTIES_EARNED = 'royalties-earned',
  COLLECTION_CREATED = 'collection-created',
  ITEM_PUBLISHED = 'item-published',
  TRANSFER_RECEIVED = 'transfer-received',
  TIP_RECEIVED = 'tip-received'
}

export enum EventSubTypeMarketplace {
  BID_RECEIVED = 'bid-received'
}

export enum EventSubTypeCatalystDeployment {
  SCENE = 'scene',
  PROFILE = 'profile',
  WEARABLE = 'wearable',
  STORE = 'store',
  EMOTE = 'emote',
  OUTFITS = 'outfits'
}

export enum EventSubTypeWorlds {
  DEPLOYMENT = 'deployment',
  WORLD_SETTINGS_CHANGED = 'world_settings_changed',
  WORLD_SCENES_UNDEPLOYMENT = 'world_scenes_undeployment',
  WORLD_UNDEPLOYMENT = 'world_undeployment',
  WORLD_SPAWN_COORDINATE_SET = 'world_spawn_coordinate_set',
  WORLDS_PERMISSION_GRANTED = 'worlds_permission_granted',
  WORLDS_PERMISSION_REVOKED = 'worlds_permission_revoked',
  WORLDS_ACCESS_RESTORED = 'worlds_access_restored',
  WORLDS_ACCESS_RESTRICTED = 'worlds_access_restricted',
  WORLDS_MISSING_RESOURCES = 'worlds_missing_resources'
}

export enum EventSubTypeClient {
  LOGGED_IN = 'logged-in',
  LOGGED_IN_CACHED = 'logged-in-cached',
  MOVE_TO_PARCEL = 'move-to-parcel',
  USED_EMOTE = 'used-emote',
  PASSPORT_OPENED = 'passport-opened',
  WALKED_DISTANCE = 'walked-distance',
  VERTICAL_HEIGHT_REACHED = 'vertical-height-reached'
}

export enum EventSubTypeWeb {
  AUTH_IDENTIFY = 'auth-identify'
}

export enum EventSubTypeRewards {
  REWARD_IN_PROGRESS = 'reward-in-progress',
  REWARD_ASSIGNED = 'reward-assigned',
  CAMPAIGN_OUT_OF_FUNDS = 'campaign-out-of-funds',
  CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED = 'campaign-gas-price-higher-than-expected',
  CAMPAIGN_OUT_OF_STOCK = 'campaign-out-of-stock',
  REWARD_DELAYED = 'reward-delayed'
}

export enum EventSubTypeBadge {
  GRANTED = 'badge-granted'
}

export enum EventSubTypeAssetBundle {
  CONVERTED = 'converted',
  MANUALLY_QUEUED = 'manually-queued'
}

export enum EventSubTypeSocialService {
  FRIENDSHIP_REQUEST = 'friendship-request',
  FRIENDSHIP_ACCEPTED = 'friendship-accepted'
}

export enum EventSubTypeCreditsService {
  CREDITS_GOAL_COMPLETED = 'credits-goal-completed',
  COMPLETE_GOALS_REMINDER = 'complete-goals-reminder',
  CLAIM_CREDITS_REMINDER = 'claim-credits-reminder',
  DO_NOT_MISS_OUT_REMINDER = 'do-not-miss-out-reminder',
  USAGE_REMINDER = 'usage-reminder',
  USAGE_24_HOURS_REMINDER = 'usage-24-hours-reminder',
  ON_DEMAND_CREDITS_GRANTED = 'on-demand-credits-granted',
  NEW_SEASON_REMINDER = 'new-season-reminder'
}

export enum EventSubTypeStreaming {
  STREAMING_KEY_RESET = 'streaming-key-reset',
  STREAMING_KEY_REVOKE = 'streaming-key-revoke',
  STREAMING_KEY_EXPIRED = 'streaming-key-expired',
  STREAMING_TIME_EXCEEDED = 'streaming-time-exceeded',
  STREAMING_PLACE_UPDATED = 'streaming-place-updated',
  COMMUNITY_STREAMING_ENDED = 'community-streaming-ended'
}

export enum EventSubTypeComms {
  USER_JOINED_ROOM = 'user-joined-room',
  USER_LEFT_ROOM = 'user-left-room',
  USER_BANNED_FROM_SCENE = 'user-banned-from-scene',
  USER_UNBANNED_FROM_SCENE = 'user-unbanned-from-scene'
}

export enum EventSubTypeReferral {
  REFERRAL_INVITED_USERS_ACCEPTED = 'referral-invited-users-accepted',
  REFERRAL_NEW_TIER_REACHED = 'referral-new-tier-reached'
}

export enum EventSubTypeCommunity {
  DELETED = 'community-deleted',
  DELETED_CONTENT_VIOLATION = 'community-deleted-content-violation',
  RENAMED = 'community-renamed',
  MEMBER_BANNED = 'community-member-banned',
  MEMBER_LEFT = 'community-member-left',
  MEMBER_REMOVED = 'community-member-removed',
  REQUEST_TO_JOIN_RECEIVED = 'community-request-to-join-received',
  REQUEST_TO_JOIN_ACCEPTED = 'community-request-to-join-accepted',
  INVITE_RECEIVED = 'community-invite-received',
  OWNERSHIP_TRANSFERRED = 'community-ownership-transferred',
  POST_ADDED = 'community-post-added',
  VOICE_CHAT_STARTED = 'community-voice-chat-started'
}

export enum EventSubTypeCamera {
  PHOTO_TAKEN = 'photo-taken',
  PHOTO_PRIVACY_CHANGED = 'photo-privacy-changed'
}

export enum EventSubTypeEvent {
  EVENT_CREATED = 'event-created',
  EVENT_STARTS_SOON = 'event-starts-soon',
  EVENT_STARTED = 'event-started',
  EVENT_ENDED = 'event-ended'
}

export enum EventSubTypeGovernance {
  PROPOSAL_ENACTED = 'governance_proposal_enacted',
  COAUTHOR_REQUESTED = 'governance_coauthor_requested',
  PITCH_PASSED = 'governance_pitch_passed',
  TENDER_PASSED = 'governance_tender_passed',
  AUTHORED_PROPOSAL_FINISHED = 'governance_authored_proposal_finished',
  VOTING_ENDED_VOTER = 'governance_voting_ended_voter',
  NEW_COMMENT_ON_PROPOSAL = 'governance_new_comment_on_proposal',
  NEW_COMMENT_ON_PROJECT_UPDATED = 'governance_new_comment_on_project_update',
  WHALE_VOTE = 'governance_whale_vote',
  VOTED_ON_BEHALF = 'governance_voted_on_behalf',
  CLIFF_ENDED = 'governance_cliff_ended'
}

export type BaseEvent = {
  type: EventType
  subType:
    | EventSubTypeBlockchain
    | EventSubTypeCatalystDeployment
    | EventSubTypeClient
    | EventSubTypeMarketplace
    | EventSubTypeRewards
    | EventSubTypeBadge
    | EventSubTypeAssetBundle
    | EventSubTypeSocialService
    | EventSubTypeCreditsService
    | EventSubTypeStreaming
    | EventSubTypeComms
    | EventSubTypeReferral
    | EventSubTypeCommunity
    | EventSubTypeCamera
    | EventSubTypeWeb
    | EventSubTypeEvent
    | EventSubTypeGovernance
    | EventSubTypeWorlds
  key: string
  timestamp: number
}

export type Event =
  | BadgeGrantedEvent
  | BidAcceptedEvent
  | BidReceivedEvent
  | CampaignGasPriceHigherThanExpectedEvent
  | CampaignOutOfFundsEvent
  | CampaignOutOfStockEvent
  | CatalystDeploymentEvent
  | CollectionCreatedEvent
  | FriendshipRequestEvent
  | FriendshipAcceptedEvent
  | ItemPublishedEvent
  | ItemSoldEvent
  | LoggedInEvent
  | LoggedInCachedEvent
  | MoveToParcelEvent
  | PassportOpenedEvent
  | RentalEndedEvent
  | RentalStartedEvent
  | RewardAssignedEvent
  | RewardDelayedEvent
  | RewardInProgressEvent
  | RoyaltiesEarnedEvent
  | UsedEmoteEvent
  | VerticalHeightReachedEvent
  | WalkedDistanceEvent
  | CreditsGoalCompletedEvent
  | CreditsOnDemandEvent
  | StreamingKeyResetEvent
  | StreamingKeyRevokeEvent
  | StreamingKeyExpiredEvent
  | StreamingTimeExceededEvent
  | StreamingPlaceUpdatedEvent
  | CommunityStreamingEndedEvent
  | UserJoinedRoomEvent
  | UserLeftRoomEvent
  | UserBannedFromSceneEvent
  | UserUnbannedFromSceneEvent
  | CreditsCompleteGoalsReminderEvent
  | CreditsUsageReminderEvent
  | CreditsUsage24HoursReminderEvent
  | CreditsDoNotMissOutReminderEvent
  | CreditsClaimReminderEvent
  | CreditsNewSeasonReminderEvent
  | ReferralInvitedUsersAcceptedEvent
  | ReferralNewTierReachedEvent
  | CommunityDeletedEvent
  | CommunityDeletedContentViolationEvent
  | CommunityRenamedEvent
  | CommunityMemberBannedEvent
  | CommunityMemberLeftEvent
  | CommunityMemberRemovedEvent
  | CommunityRequestToJoinReceivedEvent
  | CommunityRequestToJoinAcceptedEvent
  | CommunityInviteReceivedEvent
  | CommunityOwnershipTransferredEvent
  | CommunityPostAddedEvent
  | CommunityVoiceChatStartedEvent
  | PhotoTakenEvent
  | PhotoPrivacyChangedEvent
  | AuthIdentifyEvent
  | EventCreatedEvent
  | EventStartedEvent
  | EventStartsSoonEvent
  | EventEndedEvent
  | GovernanceProposalEnactedEvent
  | GovernanceCoauthorRequestedEvent
  | GovernancePitchPassedEvent
  | GovernanceTenderPassedEvent
  | GovernanceAuthoredProposalFinishedEvent
  | GovernanceVotingEndedVoterEvent
  | GovernanceNewCommentOnProposalEvent
  | GovernanceNewCommentOnProjectUpdatedEvent
  | GovernanceWhaleVoteEvent
  | GovernanceVotedOnBehalfEvent
  | GovernanceCliffEndedEvent
  | WorldsPermissionGrantedEvent
  | WorldsPermissionRevokedEvent
  | WorldsAccessRestoredEvent
  | WorldsAccessRestrictedEvent
  | WorldsMissingResourcesEvent
  | TransferReceivedEvent
  | TipReceivedEvent
