import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { Network } from './network'

export type Collection = {
  urn: string
  name: string
  creator: string
  contractAddress: string
  isOnSale: boolean
  size: number
  createdAt: number
  updatedAt: number
  reviewedAt: number
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
  /** The timestamp in seconds since epoch when the collection was listed for sale for the first time */
  firstListedAt: number | null
}

export enum CollectionSortBy {
  NEWEST = 'newest',
  NAME = 'name',
  RECENTLY_REVIEWED = 'recently_reviewed',
  RECENTLY_LISTED = 'recently_listed',
  SIZE = 'size'
}

export type CollectionFilters = {
  first?: number
  skip?: number
  sortBy?: CollectionSortBy
  name?: string
  search?: string
  creator?: string
  contractAddress?: string
  urn?: string
  isOnSale?: boolean
  network?: Network
}

export namespace Collection {
  export const schema: JSONSchema<Collection> = {
    type: 'object',
    properties: {
      urn: {
        type: 'string'
      },
      creator: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      contractAddress: {
        type: 'string'
      },
      size: {
        type: 'integer'
      },
      isOnSale: {
        type: 'boolean'
      },
      createdAt: {
        type: 'integer'
      },
      updatedAt: {
        type: 'integer'
      },
      reviewedAt: {
        type: 'integer'
      },
      network: Network.schema,
      chainId: ChainId.schema,
      firstListedAt: {
        type: 'integer',
        nullable: true
      }
    },
    required: [
      'urn',
      'creator',
      'name',
      'contractAddress',
      'isOnSale',
      'size',
      'createdAt',
      'updatedAt',
      'reviewedAt',
      'network',
      'chainId'
    ]
  }

  export const validate: ValidateFunction<Collection> = generateLazyValidator(schema)
}
