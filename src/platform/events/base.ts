import {
  BidAcceptedEvent,
  BidReceivedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent
} from './blockchain'
import { CatalystDeployment } from './catalyst'
import { MoveToParcelEvent } from './client'

export enum EventType {
  BLOCKCHAIN = 'blockchain',
  CATALYST_DEPLOYMENT = 'catalyst-deployment',
  CLIENT = 'client'
}

export enum EventSubType {
  BID_ACCEPTED = 'bid-accepted',
  BID_RECEIVED = 'bid-received',
  ITEM_SOLD = 'item-sold',
  RENTAL_ENDED = 'land-rental-ended',
  RENTAL_STARTED = 'land-rental-started',
  ROYALTIES_EARNED = 'royalties-earned',
  MOVE_TO_PARCEL = 'move-to-parcel'
}

export type BaseEvent = {
  type: EventType
  subType: EventSubType
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
  | MoveToParcelEvent
  | CatalystDeployment
