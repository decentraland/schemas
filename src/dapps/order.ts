import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { ListingStatus } from './listing-status'
import { Network } from './network'

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

export namespace Order {
  export const schema: JSONSchema<Order> = {
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
      status: ListingStatus.schema,
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

  export const validate: ValidateFunction<Order> = generateLazyValidator(schema)
}
