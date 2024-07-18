import { BaseEvent, EventSubType, EventType } from './base'

type BidMetadata = {
  address: string
  image: string
  seller: string
  category: string
  rarity?: string
  link: string
  nftName?: string
  price: string
  title: string
  description: string
  network: string
}

export type BidAcceptedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.BID_ACCEPTED
  metadata: BidMetadata
}

export type BidReceivedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.BID_RECEIVED
  metadata: BidMetadata
}

export type ItemSoldEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.ITEM_SOLD
  metadata: {
    address: string
    image: string
    seller: string
    category: string
    rarity?: string
    link: string
    nftName?: string
    network: string
    title: string
    description: string
  }
}

type RentalMetadata = {
  address: string
  contract: string
  land?: string
  lessor: string
  tenant: string
  operator: string
  startedAt: string
  endedAt: string
  tokenId: string
  link: string
  title: string
  description?: string
}

export type RentalEndedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.RENTAL_ENDED
  metadata: RentalMetadata
}

export type RentalStartedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.RENTAL_STARTED
  metadata: RentalMetadata
}

export type RoyaltiesEarnedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.ROYALTIES_EARNED
  metadata: {
    address: string
    image: string
    category: string
    rarity?: string
    link: string
    nftName?: string
    royaltiesCut: string
    royaltiesCollector: string
    network: string
    title: string
    description?: string
  }
}

export type CollectionCreatedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubType.COLLECTION_CREATED
  metadata: {
    creator: string
    name: string
  }
}
