import {
  BidAcceptedEvent,
  CollectionCreatedEvent,
  ItemPublishedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent
} from './blockchain'
import { CatalystDeploymentEvent } from './catalyst'
import {
  LoggedInCachedEvent,
  LoggedInEvent,
  MoveToParcelEvent,
  PassportOpenedEvent,
  UsedEmoteEvent,
  VerticalHeightReachedEvent,
  WalkedDistanceEvent
} from './client'
import { UserJoinedRoomEvent } from './comms'
import { BidReceivedEvent } from './marketplace'
import { ReferralInvitedUsersAcceptedEvent, ReferralNewTierReachedEvent } from './referral'
import {
  RewardInProgressEvent,
  RewardAssignedEvent,
  CampaignOutOfFundsEvent,
  CampaignGasPriceHigherThanExpectedEvent,
  CampaignOutOfStockEvent,
  RewardDelayedEvent
} from './rewards'
import {
  BadgeGrantedEvent,
  CreditsClaimReminderEvent,
  CreditsCompleteGoalsReminderEvent,
  CreditsDoNotMissOutReminderEvent,
  CreditsGoalCompletedEvent,
  CreditsUsage24HoursReminderEvent,
  CreditsUsageReminderEvent,
  FriendshipAcceptedEvent,
  FriendshipRequestEvent
} from './services'
import {
  StreamingKeyResetEvent,
  StreamingKeyRevokeEvent,
  StreamingKeyExpiredEvent,
  StreamingTimeExceededEvent,
  StreamingPlaceUpdatedEvent
} from './streaming'

export namespace Events {
  export enum Type {
    BLOCKCHAIN = 'blockchain',
    CATALYST_DEPLOYMENT = 'catalyst-deployment',
    WORLD = 'world',
    CLIENT = 'client',
    MARKETPLACE = 'marketplace',
    REWARDS = 'rewards',
    BADGE = 'badge',
    ASSET_BUNDLE = 'asset-bundle',
    SOCIAL_SERVICE = 'social-service',
    CREDITS_SERVICE = 'credits-service',
    STREAMING = 'streaming',
    COMMS = 'comms',
    REFERRAL = 'referral'
  }

  export namespace SubType {
    export enum Blockchain {
      BID_ACCEPTED = 'bid-accepted',
      ITEM_SOLD = 'item-sold',
      RENTAL_ENDED = 'land-rental-ended',
      RENTAL_STARTED = 'land-rental-started',
      ROYALTIES_EARNED = 'royalties-earned',
      COLLECTION_CREATED = 'collection-created',
      ITEM_PUBLISHED = 'item-published'
    }

    export enum Marketplace {
      BID_RECEIVED = 'bid-received'
    }

    export enum CatalystDeployment {
      SCENE = 'scene',
      PROFILE = 'profile',
      WEARABLE = 'wearable',
      STORE = 'store',
      EMOTE = 'emote',
      OUTFITS = 'outfits'
    }

    export enum Worlds {
      DEPLOYMENT = 'deployment'
    }

    export enum Client {
      LOGGED_IN = 'logged-in',
      LOGGED_IN_CACHED = 'logged-in-cached',
      MOVE_TO_PARCEL = 'move-to-parcel',
      USED_EMOTE = 'used-emote',
      PASSPORT_OPENED = 'passport-opened',
      WALKED_DISTANCE = 'walked-distance',
      VERTICAL_HEIGHT_REACHED = 'vertical-height-reached'
    }

    export enum Rewards {
      REWARD_IN_PROGRESS = 'reward-in-progress',
      REWARD_ASSIGNED = 'reward-assigned',
      CAMPAIGN_OUT_OF_FUNDS = 'campaign-out-of-funds',
      CAMPAIGN_GAS_PRICE_HIGHER_THAN_EXPECTED = 'campaign-gas-price-higher-than-expected',
      CAMPAIGN_OUT_OF_STOCK = 'campaign-out-of-stock',
      REWARD_DELAYED = 'reward-delayed'
    }

    export enum Badge {
      GRANTED = 'badge-granted'
    }

    export enum AssetBundle {
      CONVERTED = 'converted',
      MANUALLY_QUEUED = 'manually-queued'
    }

    export enum SocialService {
      FRIENDSHIP_REQUEST = 'friendship-request',
      FRIENDSHIP_ACCEPTED = 'friendship-accepted'
    }

    export enum CreditsService {
      CREDITS_GOAL_COMPLETED = 'credits-goal-completed',
      COMPLETE_GOALS_REMINDER = 'complete-goals-reminder',
      CLAIM_CREDITS_REMINDER = 'claim-credits-reminder',
      DO_NOT_MISS_OUT_REMINDER = 'do-not-miss-out-reminder',
      USAGE_REMINDER = 'usage-reminder',
      USAGE_24_HOURS_REMINDER = 'usage-24-hours-reminder'
    }

    export enum Streaming {
      STREAMING_KEY_RESET = 'streaming-key-reset',
      STREAMING_KEY_REVOKE = 'streaming-key-revoke',
      STREAMING_KEY_EXPIRED = 'streaming-key-expired',
      STREAMING_TIME_EXCEEDED = 'streaming-time-exceeded',
      STREAMING_PLACE_UPDATED = 'streaming-place-updated'
    }

    export enum Comms {
      USER_JOINED_ROOM = 'user-joined-room'
    }

    export enum Referral {
      REFERRAL_INVITED_USERS_ACCEPTED = 'referral-invited-users-accepted',
      REFERRAL_NEW_TIER_REACHED = 'referral-new-tier-reached'
    }
  }
}

export type BaseEvent = {
  type: Events.Type
  subType:
    | Events.SubType.Blockchain
    | Events.SubType.CatalystDeployment
    | Events.SubType.Client
    | Events.SubType.Marketplace
    | Events.SubType.Rewards
    | Events.SubType.Badge
    | Events.SubType.AssetBundle
    | Events.SubType.SocialService
    | Events.SubType.CreditsService
    | Events.SubType.Streaming
    | Events.SubType.Comms
    | Events.SubType.Referral
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
  | StreamingKeyResetEvent
  | StreamingKeyRevokeEvent
  | StreamingKeyExpiredEvent
  | StreamingTimeExceededEvent
  | StreamingPlaceUpdatedEvent
  | UserJoinedRoomEvent
  | CreditsCompleteGoalsReminderEvent
  | CreditsUsageReminderEvent
  | CreditsUsage24HoursReminderEvent
  | CreditsDoNotMissOutReminderEvent
  | CreditsClaimReminderEvent
  | ReferralInvitedUsersAcceptedEvent
  | ReferralNewTierReachedEvent
