import type { JSONSchema } from '../validation/types.js'
import { ChainId, chainIdSchema } from './chain-id.js'
import { ListingStatus, listingStatusSchema } from './listing-status.js'
import { Network, networkSchema } from './network.js'

export type Order = {
  id: string
  marketplaceAddress: string
  contractAddress: string
  tokenId: string
  owner: string
  buyer: string | null
  price: string
  status: ListingStatus
  expiresAt: number
  createdAt: number
  updatedAt: number
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
  issuedId: string
  tradeId?: string
}

export type OrderFilters = {
  first?: number
  skip?: number
  sortBy?: OrderSortBy
  marketplaceAddress?: string
  owner?: string
  buyer?: string
  contractAddress?: string
  tokenId?: string
  status?: ListingStatus
  network?: Network
  itemId?: string
  nftName?: string
}

export enum OrderSortBy {
  RECENTLY_LISTED = 'recently_listed',
  RECENTLY_UPDATED = 'recently_updated',
  CHEAPEST = 'cheapest',
  ISSUED_ID_ASC = 'issued_id_asc',
  ISSUED_ID_DESC = 'issued_id_desc',
  OLDEST = 'oldest'
}

export const orderSchema: JSONSchema<Order> = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    marketplaceAddress: {
      type: 'string'
    },
    contractAddress: {
      type: 'string'
    },
    tokenId: {
      type: 'string'
    },
    owner: {
      type: 'string'
    },
    buyer: {
      type: ['string'],
      nullable: true
    },
    price: {
      type: 'string'
    },
    status: listingStatusSchema,
    network: networkSchema,
    chainId: chainIdSchema,
    expiresAt: {
      type: 'integer'
    },
    createdAt: {
      type: 'integer'
    },
    updatedAt: {
      type: 'integer'
    },
    issuedId: {
      type: 'string'
    },
    tradeId: {
      type: 'string',
      nullable: true
    }
  },
  required: [
    'id',
    'marketplaceAddress',
    'contractAddress',
    'tokenId',
    'owner',
    'buyer',
    'price',
    'status',
    'network',
    'chainId',
    'expiresAt',
    'createdAt',
    'updatedAt'
  ]
}
