import type { JSONSchema } from '../validation/types.js'
import { ChainId, chainIdSchema } from './chain-id.js'
import { EmoteCategory, EmotePlayMode, EmoteOutcomeType } from '../platform/index.js'
import { Network, networkSchema } from './network.js'
import { NFT, nftSchema } from './nft.js'
import { NFTCategory, nftCategorySchema } from './nft-category.js'
import { Rarity } from './rarity.js'
import { WearableCategory } from '../platform/item/wearable/wearable-category.js'
import { GenderFilterOption, WearableGender } from './wearable-gender.js'

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
  beneficiary: string | null
  createdAt: number
  updatedAt: number
  reviewedAt: number
  soldAt: number
  data: NFT['data']
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
  urn: string
  /** The timestamp in seconds since epoch when the item was listed for sale for the first time */
  firstListedAt: number | null
  picks?: {
    pickedByUser?: boolean
    count: number
  }
  /** The following fields are for the items for the Marketplace's catalog */
  minPrice?: string
  minListingPrice?: string | null
  maxListingPrice?: string | null
  listings?: number | null
  owners?: number | null
  /** A description of the utility the item has in the explorer */
  utility?: string
  tradeId?: string
  tradeExpiresAt?: number
  tradeContractAddress?: string
}

export type ItemFilters = {
  first?: number
  skip?: number
  sortBy?: ItemSortBy
  category?: NFTCategory
  /** The address or the addresses of the creators to filter for */
  creator?: string | string[]
  rarities?: Rarity[]
  isSoldOut?: boolean
  isOnSale?: boolean
  search?: string
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  isWearableSmart?: boolean
  wearableCategory?: WearableCategory
  wearableGenders?: (WearableGender | GenderFilterOption)[]
  emoteCategory?: EmoteCategory
  emoteGenders?: (WearableGender | GenderFilterOption)[]
  emotePlayMode?: EmotePlayMode | EmotePlayMode[]
  ids?: string[]
  contractAddresses?: string[]
  itemId?: string
  network?: Network
  /**
   * Returns items whose price is greater or equal to this value
   */
  minPrice?: string
  /**
   * Returns items whose price is smaller or equal to this value
   */
  maxPrice?: string
  urns?: string[]
  /**
   * Returns emotes that have sound
   */
  emoteHasSound?: boolean
  /**
   * Returns emotes that have additional geomtry
   */
  emoteHasGeometry?: boolean
  /**
   * Returns emotes that have an outcome type
   */
  emoteOutcomeType?: EmoteOutcomeType
}

export enum ItemSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_REVIEWED = 'recently_reviewed',
  RECENTLY_SOLD = 'recently_sold',
  RECENTLY_LISTED = 'recently_listed',
  CHEAPEST = 'cheapest'
}

export const itemSchema: JSONSchema<Item> = {
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
    category: nftCategorySchema,
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
    beneficiary: {
      type: 'string',
      nullable: true
    },
    tradeId: {
      type: 'string',
      nullable: true
    },
    tradeContractAddress: {
      type: 'string',
      nullable: true
    },
    data: nftSchema.properties!.data,
    network: networkSchema,
    chainId: chainIdSchema,
    urn: {
      type: 'string'
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
    soldAt: {
      type: 'integer'
    },
    firstListedAt: {
      type: 'integer',
      nullable: true
    },
    picks: {
      type: 'object',
      properties: {
        pickedByUser: {
          type: 'boolean',
          nullable: true
        },
        count: {
          type: 'integer'
        }
      },
      required: ['count'],
      nullable: true
    },
    minPrice: {
      type: 'string',
      nullable: true
    },
    utility: {
      type: 'string',
      nullable: true
    },
    minListingPrice: {
      type: 'string',
      nullable: true
    },
    maxListingPrice: {
      type: 'string',
      nullable: true
    },
    listings: {
      type: 'integer',
      nullable: true
    },
    owners: {
      type: 'integer',
      nullable: true
    },
    tradeExpiresAt: {
      type: 'integer',
      nullable: true
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
