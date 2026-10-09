import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'
import { BidEventMetadata } from './blockchain'

export type BidReceivedEvent = BaseEvent & {
  type: Events.Type.MARKETPLACE
  subType: Events.SubType.Marketplace.BID_RECEIVED
  metadata: BidEventMetadata
}

export namespace BidReceivedEvent {
  export const schema: JSONSchema<BidReceivedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.MARKETPLACE },
      subType: { type: 'string', const: Events.SubType.Marketplace.BID_RECEIVED },
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

/**
 * A creator discount started on an item the recipient has in their favorites.
 */
export type ItemDiscountedEventMetadata = {
  address: string
  image: string
  category: string
  rarity?: string
  nftName?: string
  contractAddress: string
  itemId: string
  link: string
  discountPct: number
  listPrice: string
  salePrice: string
  endsAt: number
  title: string
  description: string
  network: string
}

export type ItemDiscountedEvent = BaseEvent & {
  type: Events.Type.MARKETPLACE
  subType: Events.SubType.Marketplace.ITEM_DISCOUNTED
  metadata: ItemDiscountedEventMetadata
}

export namespace ItemDiscountedEvent {
  export const schema: JSONSchema<ItemDiscountedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.MARKETPLACE },
      subType: { type: 'string', const: Events.SubType.Marketplace.ITEM_DISCOUNTED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          image: { type: 'string' },
          category: { type: 'string' },
          rarity: { type: 'string', nullable: true },
          nftName: { type: 'string', nullable: true },
          contractAddress: { type: 'string' },
          itemId: { type: 'string' },
          link: { type: 'string' },
          discountPct: { type: 'integer', minimum: 1, maximum: 100 },
          listPrice: { type: 'string', pattern: '^\\d+$' },
          salePrice: { type: 'string', pattern: '^\\d+$' },
          endsAt: { type: 'number', minimum: 0 },
          title: { type: 'string' },
          description: { type: 'string' },
          network: { type: 'string' }
        },
        required: [
          'address',
          'image',
          'category',
          'contractAddress',
          'itemId',
          'link',
          'discountPct',
          'listPrice',
          'salePrice',
          'endsAt',
          'title',
          'description',
          'network'
        ]
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<ItemDiscountedEvent> = generateLazyValidator(schema)
}
