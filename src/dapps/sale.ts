import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { SaleType } from './sale-type'
import { Network } from './network'
import { NFTCategory } from './nft-category'

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

export namespace Sale {
  export const schema: JSONSchema<Sale> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      type: SaleType.schema,
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
      network: Network.schema,
      chainId: ChainId.schema
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

  export const validate: ValidateFunction<Sale> = generateLazyValidator(schema)
}
