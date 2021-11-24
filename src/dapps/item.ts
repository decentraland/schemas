import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { Network } from './network'
import { NFT } from './nft'
import { NFTCategory } from './nft-category'
import { Rarity } from './rarity'
import { WearableCategory } from './wearable-category'
import { WearableGender } from './wearable-gender'

export type Item = {
  id: string
  name: string
  thumbnail: string
  url: string
  category: NFTCategory
  contractAddress: string
  itemId: string
  rarity: Rarity
  price: string
  available: number
  isOnSale: boolean
  creator: string
  createdAt: number
  updatedAt: number
  reviewedAt: number
  soldAt: number
  data: NFT['data']
  network: Network
  chainId: ChainId
}

export type ItemFilters = {
  first?: number
  skip?: number
  sortBy?: ItemSortBy
  creator?: string
  rarities?: Rarity[]
  isSoldOut?: boolean
  isOnSale?: boolean
  search?: string
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableGenders?: WearableGender[]
  contractAddress?: string
  itemId?: string
  network?: Network
}

export enum ItemSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_REVIEWED = 'recently_reviewed',
  RECENTLY_SOLD = 'recently_sold',
  CHEAPEST = 'cheapest'
}

export namespace Item {
  export const schema: JSONSchema<Item> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      thumbnail: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
      category: NFTCategory.schema,
      contractAddress: {
        type: 'string'
      },
      itemId: {
        type: 'string'
      },
      rarity: {
        type: 'string'
      },
      price: {
        type: 'string'
      },
      available: {
        type: 'integer'
      },
      isOnSale: {
        type: 'boolean'
      },
      creator: {
        type: 'string'
      },
      data: NFT.schema.properties!.data,
      network: Network.schema,
      chainId: ChainId.schema,
      createdAt: {
        type: 'integer'
      },
      updatedAt: {
        type: 'integer'
      },
      reviewedAt: {
        type: 'integer'
      },
      soldAt: {
        type: 'integer'
      }
    },
    required: [
      'id',
      'name',
      'thumbnail',
      'url',
      'category',
      'contractAddress',
      'itemId',
      'rarity',
      'price',
      'available',
      'isOnSale',
      'creator',
      'data',
      'network',
      'chainId',
      'createdAt',
      'updatedAt',
      'soldAt'
    ]
  }

  export const validate: ValidateFunction<Item> = generateValidator(schema)
}
