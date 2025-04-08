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
  MoveToParcelEvent,
  PassportOpenedEvent,
  UsedEmoteEvent,
  VerticalHeightReachedEvent,
  WalkedDistanceEvent
} from './client'
import { BidReceivedEvent } from './marketplace'
import {
  RewardInProgressEvent,
  RewardAssignedEvent,
  CampaignOutOfFundsEvent,
  CampaignGasPriceHigherThanExpectedEvent,
  CampaignOutOfStockEvent,
  RewardDelayedEvent
} from './rewards'
import { BadgeGrantedEvent, FriendshipAcceptedEvent, FriendshipRequestEvent } from './services'

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
    CREDITS_SERVICE = 'credits-service'
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
      CREDITS_GOAL_COMPLETED = 'credits-goal-completed'
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
