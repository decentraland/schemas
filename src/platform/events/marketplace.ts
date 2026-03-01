import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeMarketplace } from './base.js'
import { BidEventMetadata } from './blockchain.js'

export type BidReceivedEvent = BaseEvent & {
  type: EventType.MARKETPLACE
  subType: EventSubTypeMarketplace.BID_RECEIVED
  metadata: BidEventMetadata
}

export const bidReceivedEventSchema: JSONSchema<BidReceivedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.MARKETPLACE },
    subType: { type: 'string', const: EventSubTypeMarketplace.BID_RECEIVED },
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
