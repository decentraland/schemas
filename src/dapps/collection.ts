import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
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
  network: Network
  chainId: ChainId
}

export enum CollectionSortBy {
  NEWEST = 'newest',
  NAME = 'name',
  RECENTLY_REVIEWED = 'recently_reviewed',
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
      chainId: ChainId.schema
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

  export const validate: ValidateFunction<Collection> =
    generateValidator(schema)
}
