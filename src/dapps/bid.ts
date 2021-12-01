import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { ListingStatus } from './listing-status'
import { Network } from './network'

export type Bid = {
  id: string
  bidAddress: string
  bidder: string
  seller: string
  price: string
  fingerprint: string
  status: ListingStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  createdAt: number
  updatedAt: number
  contractAddress: string
  tokenId: string
  network: Network
  chainId: ChainId
}

export enum BidSortBy {
  RECENTLY_OFFERED = 'recently_offered',
  RECENTLY_UPDATED = 'recently_updated',
  MOST_EXPENSIVE = 'most_expensive'
}

export type BidFilters = {
  first?: number
  skip?: number
  sortBy?: BidSortBy
  bidAddress?: string
  bidder?: string
  seller?: string
  contractAddress?: string
  tokenId?: string
  status?: ListingStatus
  network?: Network
}

export namespace Bid {
  export const schema: JSONSchema<Bid> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      bidAddress: {
        type: 'string'
      },
      bidder: {
        type: 'string'
      },
      seller: {
        type: 'string'
      },
      price: {
        type: 'string'
      },
      fingerprint: {
        type: 'string'
      },
      status: ListingStatus.schema,
      blockchainId: {
        type: 'string'
      },
      blockNumber: {
        type: 'string'
      },
      contractAddress: {
        type: 'string'
      },
      tokenId: {
        type: 'string'
      },
      network: Network.schema,
      chainId: ChainId.schema,
      expiresAt: {
        type: 'integer'
      },
      createdAt: {
        type: 'integer'
      },
      updatedAt: {
        type: 'integer'
      }
    },
    required: [
      'id',
      'bidAddress',
      'bidder',
      'seller',
      'price',
      'fingerprint',
      'status',
      'blockchainId',
      'blockNumber',
      'contractAddress',
      'tokenId',
      'network',
      'chainId',
      'expiresAt',
      'createdAt',
      'updatedAt'
    ]
  }

  export const validate: ValidateFunction<Bid> = generateValidator(schema)
}
