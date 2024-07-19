import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
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

export namespace BidAcceptedEvent {
  export const schema: JSONSchema<BidAcceptedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.BID_ACCEPTED },
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

  export const validate: ValidateFunction<BidAcceptedEvent> = generateLazyValidator(schema)
}

export type BidReceivedEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.BID_RECEIVED
  metadata: BidMetadata
}

export namespace BidReceivedEvent {
  export const schema: JSONSchema<BidReceivedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.BID_RECEIVED },
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
    additionalProperties: false
  }

  export const validate: ValidateFunction<BidReceivedEvent> = generateLazyValidator(schema)
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

export namespace ItemSoldEvent {
  export const schema: JSONSchema<ItemSoldEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.ITEM_SOLD },
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

  export const validate: ValidateFunction<ItemSoldEvent> = generateLazyValidator(schema)
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

export namespace RentalEndedEvent {
  export const schema: JSONSchema<RentalEndedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.RENTAL_ENDED },
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

  export const validate: ValidateFunction<RentalEndedEvent> = generateLazyValidator(schema)
}

export type RentalStartedEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.RENTAL_STARTED
  metadata: RentalMetadata
}

export namespace RentalStartedEvent {
  export const schema: JSONSchema<RentalStartedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.RENTAL_STARTED },
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

  export const validate: ValidateFunction<RentalStartedEvent> = generateLazyValidator(schema)
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

export namespace RoyaltiesEarnedEvent {
  export const schema: JSONSchema<RoyaltiesEarnedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.ROYALTIES_EARNED },
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

  export const validate: ValidateFunction<RoyaltiesEarnedEvent> = generateLazyValidator(schema)
}

export type CollectionCreatedEvent = BaseEvent & {
  type: Events.Type.BLOCKCHAIN
  subType: Events.SubType.Blockchain.COLLECTION_CREATED
  metadata: {
    creator: string
    name: string
  }
}

export namespace CollectionCreatedEvent {
  export const schema: JSONSchema<CollectionCreatedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.BLOCKCHAIN },
      subType: { type: 'string', const: Events.SubType.Blockchain.COLLECTION_CREATED },
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

  export const validate: ValidateFunction<CollectionCreatedEvent> = generateLazyValidator(schema)
}
