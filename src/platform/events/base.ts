import {
  BidAcceptedEvent,
  BidReceivedEvent,
  CollectionCreatedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent
} from './blockchain'
import { CatalystDeploymentEvent } from './catalyst'
import { MoveToParcelEvent } from './client'

export namespace Events {
  export enum Type {
    BLOCKCHAIN = 'blockchain',
    CATALYST_DEPLOYMENT = 'catalyst-deployment',
    CLIENT = 'client'
  }

  export namespace SubType {
    export enum Blockchain {
      BID_ACCEPTED = 'bid-accepted',
      BID_RECEIVED = 'bid-received',
      ITEM_SOLD = 'item-sold',
      RENTAL_ENDED = 'land-rental-ended',
      RENTAL_STARTED = 'land-rental-started',
      ROYALTIES_EARNED = 'royalties-earned',
      COLLECTION_CREATED = 'collection-created'
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
      MOVE_TO_PARCEL = 'move-to-parcel'
    }
  }
}

export type BaseEvent = {
  type: Events.Type
  subType: Events.SubType.Blockchain | Events.SubType.CatalystDeployment | Events.SubType.Client
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
