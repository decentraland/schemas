import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { PaginatedParameters } from './common'
import { ListingStatus } from './listing-status'
import { Network } from './network'

export type BaseBid = {
  id: string
  bidder: string
  /**
   * When the bid is on an item, this is the address of the creator of the collection
   * When the bid is on an NFT, this is the address of the owner of the NFT
   */
  seller: string
  price: string
  status: ListingStatus
  /** expiration date in milliseconds */
  expiresAt: number
  /** creation date in milliseconds */
  createdAt: number
  /** updated date in milliseconds */
  updatedAt: number
  contractAddress: string
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
  fingerprint: string
}

export type LegacyBid = BaseBid & {
  bidAddress: string
  blockchainId: string
  blockNumber: string
  tokenId: string
}

export type ItemBid = BaseBid & {
  tradeId: string
  itemId: string
}

export type NFTBid = BaseBid & {
  tradeId: string
  tokenId: string
}

export type BidTrade = NFTBid | ItemBid

export type Bid = LegacyBid | BidTrade

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

export type GetBidsParameters = PaginatedParameters & {
  bidder?: string
  seller?: string
  sortBy?: BidSortBy
  contractAddress?: string
  tokenId?: string
  status?: ListingStatus
  network?: Network
  itemId?: string
  bidAddress?: string
}

export namespace Bid {
  const baseBidSchema: JSONSchema<BaseBid> = {
    type: 'object',
    properties: {
      id: {
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
      contractAddress: {
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
      'bidder',
      'seller',
      'price',
      'fingerprint',
      'status',
      'contractAddress',
      'network',
      'chainId',
      'expiresAt',
      'createdAt',
      'updatedAt'
    ]
  }

  export const schema: JSONSchema<Bid> = {
    type: 'object',
    required: [],
    oneOf: [
      {
        properties: {
          ...baseBidSchema.properties,
          tradeId: {
            type: 'string'
          },
          tokenId: {
            type: 'string'
          }
        },
        required: [...baseBidSchema.required, 'tradeId', 'tokenId']
      },
      {
        type: 'object',
        properties: {
          ...baseBidSchema.properties,
          tradeId: {
            type: 'string'
          },
          itemId: {
            type: 'string'
          }
        },
        required: [...baseBidSchema.required, 'tradeId', 'itemId']
      },
      {
        type: 'object',
        properties: {
          ...baseBidSchema.properties,
          bidAddress: {
            type: 'string'
          },
          blockchainId: {
            type: 'string'
          },
          blockNumber: {
            type: 'string'
          },
          tokenId: {
            type: 'string'
          }
        },
        required: [...baseBidSchema.required, 'bidAddress', 'blockchainId', 'blockNumber', 'tokenId']
      }
    ]
  }

  export const validate: ValidateFunction<Bid> = generateLazyValidator(schema)
}
