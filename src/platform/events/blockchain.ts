import { BaseEvent, Events } from './base'

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
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.BID_ACCEPTED
  metadata: BidMetadata
}

export type BidReceivedEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.BID_RECEIVED
  metadata: BidMetadata
}

export type ItemSoldEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.ITEM_SOLD
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
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.RENTAL_ENDED
  metadata: RentalMetadata
}

export type RentalStartedEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.RENTAL_STARTED
  metadata: RentalMetadata
}

export type RoyaltiesEarnedEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.ROYALTIES_EARNED
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
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.COLLECTION_CREATED
  metadata: {
    creator: string
    name: string
  }
}
