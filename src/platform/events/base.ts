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
  BID_ACCEPTED = 'bid-accepted',
  BID_RECEIVED = 'bid-received',
  ITEM_SOLD = 'item-sold',
  RENTAL_ENDED = 'land-rental-ended',
  RENTAL_STARTED = 'land-rental-started',
  ROYALTIES_EARNED = 'royalties-earned',
  CATALYST_DEPLOYMENT = 'catalyst-deployment',
  MOVE_TO_PARCEL = 'move-to-parcel'
}

export type BaseEvent = {
  type: string
  subType: string
  key: string
  timestamp: number
}

export type EventNotification =
  | BidAcceptedEvent
  | BidReceivedEvent
  | ItemSoldEvent
  | RentalEndedEvent
  | RentalStartedEvent
  | RoyaltiesEarnedEvent
  | MoveToParcelEvent
  | CatalystDeployment
