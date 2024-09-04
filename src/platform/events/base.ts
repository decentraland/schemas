import {
  BidAcceptedEvent,
  CollectionCreatedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent
} from './blockchain'
import { CatalystDeploymentEvent } from './catalyst'
import { MoveToParcelEvent } from './client'
import { BidReceivedEvent } from './marketplace'
import {
  RewardInProgressEvent,
  RewardAssignedEvent,
  CampaignOutOfFundsEvent,
  CampaignGasPriceHigherThanExpectedEvent,
  CampaignOutOfStockEvent,
  RewardDelayedEvent
} from './rewards'
import { BadgeGrantedEvent } from './services'

export namespace Events {
  export enum Type {
    BLOCKCHAIN = 'blockchain',
    CATALYST_DEPLOYMENT = 'catalyst-deployment',
    CLIENT = 'client',
    MARKETPLACE = 'marketplace',
    REWARDS = 'rewards',
    BADGE = 'badge'
  }

  export namespace SubType {
    export enum Blockchain {
      BID_ACCEPTED = 'bid-accepted',
      ITEM_SOLD = 'item-sold',
      RENTAL_ENDED = 'land-rental-ended',
      RENTAL_STARTED = 'land-rental-started',
      ROYALTIES_EARNED = 'royalties-earned',
      COLLECTION_CREATED = 'collection-created'
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

    export enum Client {
      MOVE_TO_PARCEL = 'move-to-parcel',
      USED_EMOTE = 'used-emote'
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
  key: string
  timestamp: number
}

export type Event =
  | BidAcceptedEvent
  | BidReceivedEvent
  | ItemSoldEvent
  | RentalEndedEvent
  | RentalStartedEvent
  | RoyaltiesEarnedEvent
  | CollectionCreatedEvent
  | MoveToParcelEvent
  | CatalystDeploymentEvent
  | RewardInProgressEvent
  | RewardAssignedEvent
  | CampaignOutOfFundsEvent
  | CampaignGasPriceHigherThanExpectedEvent
  | CampaignOutOfStockEvent
  | RewardDelayedEvent
  | BadgeGrantedEvent
