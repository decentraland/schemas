import { BaseEvent, EventType } from './base'

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
  type: EventType.BID_ACCEPTED
  metadata: BidMetadata
}

export type BidReceivedEvent = BaseEvent & {
  type: EventType.BID_RECEIVED
  metadata: BidMetadata
}

export type ItemSoldEvent = BaseEvent & {
  type: EventType.ITEM_SOLD
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
  type: EventType.RENTAL_ENDED
  metadata: RentalMetadata
}

export type RentalStartedEvent = BaseEvent & {
  type: EventType.RENTAL_STARTED
  metadata: RentalMetadata
}

export type RoyaltiesEarnedEvent = BaseEvent & {
  type: EventType.ROYALTIES_EARNED
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
