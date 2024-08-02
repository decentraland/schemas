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
