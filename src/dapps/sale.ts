import type { JSONSchema } from '../validation/types.js'
import { ChainId, chainIdSchema } from './chain-id.js'
import { SaleType, saleTypeSchema } from './sale-type.js'
import { Network, networkSchema } from './network.js'
import { NFTCategory } from './nft-category.js'

export type Sale = {
  id: string
  type: SaleType
  buyer: string
  seller: string
  itemId: string | null
  tokenId: string
  contractAddress: string
  price: string
  timestamp: number
  txHash: string
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
}

export enum SaleSortBy {
  RECENTLY_SOLD = 'recently_sold',
  MOST_EXPENSIVE = 'most_expensive'
}

export type SaleFilters = {
  first?: number
  skip?: number
  sortBy?: SaleSortBy
  type?: SaleType
  categories?: NFTCategory[]
  buyer?: string
  seller?: string
  contractAddress?: string
  itemId?: string
  tokenId?: string
  from?: number
  to?: number
  minPrice?: string
  maxPrice?: string
  network?: Network
}

export const saleSchema: JSONSchema<Sale> = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    type: saleTypeSchema,
    buyer: {
      type: 'string'
    },
    seller: {
      type: 'string'
    },
    price: {
      type: 'string'
    },
    contractAddress: {
      type: 'string'
    },
    tokenId: {
      type: 'string'
    },
    itemId: {
      type: 'string'
    },
    txHash: {
      type: 'string'
    },
    timestamp: {
      type: 'integer'
    },
    network: networkSchema,
    chainId: chainIdSchema
  },
  required: [
    'id',
    'buyer',
    'seller',
    'itemId',
    'tokenId',
    'price',
    'contractAddress',
    'timestamp',
    'txHash',
    'network',
    'chainId'
  ]
}
