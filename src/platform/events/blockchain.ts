import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeBlockchain } from './base.js'

export type BidEventMetadata = {
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
  subType: EventSubTypeBlockchain.BID_ACCEPTED
  metadata: BidEventMetadata
}

export const bidAcceptedEventSchema: JSONSchema<BidAcceptedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.BID_ACCEPTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        image: { type: 'string' },
        seller: { type: 'string' },
        category: { type: 'string' },
        rarity: { type: 'string', nullable: true },
        link: { type: 'string' },
        nftName: { type: 'string', nullable: true },
        price: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        network: { type: 'string' }
      },
      required: ['address', 'image', 'seller', 'category', 'link', 'price', 'title', 'network']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: true
}

export type ItemSoldEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.ITEM_SOLD
  metadata: {
    address: string
    image: string
    buyer: string
    seller: string
    category: string
    rarity?: string
    link: string
    nftName?: string
    tokenId: string
    network: string
    title: string
    description: string
  }
}

export type ItemPublishedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.ITEM_PUBLISHED
  metadata: {
    creator: string
    category: string
    itemId: string
    urn: string
    network: string
    rarity?: string
  }
}

export const itemSoldEventSchema: JSONSchema<ItemSoldEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.ITEM_SOLD },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        image: { type: 'string' },
        buyer: { type: 'string' },
        seller: { type: 'string' },
        category: { type: 'string' },
        rarity: { type: 'string', nullable: true },
        link: { type: 'string' },
        nftName: { type: 'string', nullable: true },
        tokenId: { type: 'string' },
        network: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' }
      },
      required: ['address', 'image', 'seller', 'category', 'link', 'network', 'title', 'description']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const itemPublishedEventSchema: JSONSchema<ItemPublishedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.ITEM_PUBLISHED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        creator: { type: 'string' },
        category: { type: 'string' },
        rarity: { type: 'string', nullable: true },
        itemId: { type: 'string' },
        network: { type: 'string' },
        urn: { type: 'string' }
      },
      required: ['creator', 'category', 'itemId', 'network', 'urn']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
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
  subType: EventSubTypeBlockchain.RENTAL_ENDED
  metadata: RentalMetadata
}

export const rentalEndedEventSchema: JSONSchema<RentalEndedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.RENTAL_ENDED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        contract: { type: 'string' },
        land: { type: 'string', nullable: true },
        lessor: { type: 'string' },
        tenant: { type: 'string' },
        operator: { type: 'string' },
        startedAt: { type: 'string' },
        endedAt: { type: 'string' },
        tokenId: { type: 'string' },
        link: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string', nullable: true }
      },
      required: [
        'address',
        'contract',
        'lessor',
        'tenant',
        'operator',
        'startedAt',
        'endedAt',
        'tokenId',
        'link',
        'title'
      ]
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type RentalStartedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.RENTAL_STARTED
  metadata: RentalMetadata
}

export const rentalStartedEventSchema: JSONSchema<RentalStartedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.RENTAL_STARTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        contract: { type: 'string' },
        land: { type: 'string', nullable: true },
        lessor: { type: 'string' },
        tenant: { type: 'string' },
        operator: { type: 'string' },
        startedAt: { type: 'string' },
        endedAt: { type: 'string' },
        tokenId: { type: 'string' },
        link: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string', nullable: true }
      },
      required: [
        'address',
        'contract',
        'lessor',
        'tenant',
        'operator',
        'startedAt',
        'endedAt',
        'tokenId',
        'link',
        'title'
      ]
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type RoyaltiesEarnedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.ROYALTIES_EARNED
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

export const royaltiesEarnedEventSchema: JSONSchema<RoyaltiesEarnedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.ROYALTIES_EARNED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        address: { type: 'string' },
        image: { type: 'string' },
        category: { type: 'string' },
        rarity: { type: 'string', nullable: true },
        link: { type: 'string' },
        nftName: { type: 'string', nullable: true },
        royaltiesCut: { type: 'string' },
        royaltiesCollector: { type: 'string' },
        network: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string', nullable: true }
      },
      required: ['address', 'image', 'category', 'link', 'royaltiesCut', 'royaltiesCollector', 'network', 'title']
    }
  },
  required: ['type', 'subType', 'metadata'],
  additionalProperties: false
}

export type CollectionCreatedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.COLLECTION_CREATED
  metadata: {
    creator: string
    name: string
  }
}

export const collectionCreatedEventSchema: JSONSchema<CollectionCreatedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.COLLECTION_CREATED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        creator: { type: 'string' },
        name: { type: 'string' }
      },
      required: ['creator', 'name']
    }
  },
  required: ['type', 'subType', 'metadata'],
  additionalProperties: false
}

export type TransferReceivedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.TRANSFER_RECEIVED
  metadata: {
    senderAddress: string
    receiverAddress: string
    tokenUri?: string
  }
}

export const transferReceivedEventSchema: JSONSchema<TransferReceivedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.TRANSFER_RECEIVED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        senderAddress: { type: 'string' },
        receiverAddress: { type: 'string' },
        tokenUri: { type: 'string', nullable: true }
      },
      required: ['senderAddress', 'receiverAddress'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export type TipReceivedEvent = BaseEvent & {
  type: EventType.BLOCKCHAIN
  subType: EventSubTypeBlockchain.TIP_RECEIVED
  metadata: {
    senderAddress: string
    receiverAddress: string
    amount: string
  }
}

export const tipReceivedEventSchema: JSONSchema<TipReceivedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.BLOCKCHAIN },
    subType: { type: 'string', const: EventSubTypeBlockchain.TIP_RECEIVED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        senderAddress: { type: 'string' },
        receiverAddress: { type: 'string' },
        amount: { type: 'string' }
      },
      required: ['senderAddress', 'receiverAddress', 'amount']
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}
