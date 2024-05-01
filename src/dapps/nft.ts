import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { BodyShape, EmoteCategory, EmotePlayMode } from '../platform'
import { Network } from './network'
import { NFTCategory } from './nft-category'
import { Rarity } from './rarity'
import { WearableCategory } from '../platform/item/wearable/wearable-category'
import { GenderFilterOption, WearableGender } from './wearable-gender'
import { RentalsListingsFilterBy } from './rentals-listings'

export type NFT = {
  id: string
  contractAddress: string
  tokenId: string
  activeOrderId: string | null
  /** The ID of the open rental listing associated with the NFT */
  openRentalId: string | null
  owner: string
  name: string
  category: NFTCategory
  image: string
  url: string
  issuedId: string | null
  itemId: string | null
  data: {
    parcel?: {
      x: string
      y: string
      description: string | null
      estate: {
        tokenId: string
        name: string
      } | null
    }
    estate?: {
      size: number
      parcels: { x: number; y: number }[]
      description: string | null
    }
    wearable?: {
      description: string
      category: WearableCategory
      rarity: Rarity
      bodyShapes: BodyShape[]
      isSmart: boolean
    }
    ens?: {
      subdomain: string
    }
    emote?: {
      description: string
      category: EmoteCategory
      rarity: Rarity
      bodyShapes: BodyShape[]
      loop: boolean
      hasSound: boolean
      hasGeometry: boolean
    }
  }
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
  createdAt: number
  updatedAt: number
  soldAt: number
  urn?: string
  /** A description of the utility the nft has in the explorer */
  utility?: string
}

export type NFTFilters = {
  first?: number
  skip?: number
  sortBy?: NFTSortBy
  category?: NFTCategory
  owner?: string
  isOnSale?: boolean
  isOnRent?: boolean
  search?: string
  itemRarities?: Rarity[]
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  isWearableSmart?: boolean
  wearableCategory?: WearableCategory
  wearableGenders?: (WearableGender | GenderFilterOption)[]
  emoteCategory?: EmoteCategory
  emoteGenders?: (WearableGender | GenderFilterOption)[]
  emotePlayMode?: EmotePlayMode | EmotePlayMode[]
  contractAddresses?: string[]
  creator?: string | string[]
  tokenId?: string
  itemId?: string
  network?: Network
  rentalStatus?: RentalsListingsFilterBy['status']
  ids?: string[]
  minPrice?: string
  maxPrice?: string
  /** Filter NFTs with a min estate size */
  minEstateSize?: number
  /** Filter NFTs with a max estate size */
  maxEstateSize?: number
  /** Filter NFTs with at least this distance to a plaza */
  minDistanceToPlaza?: number
  /** Filter NFTs with at most this distance to a plaza */
  maxDistanceToPlaza?: number
  /** Filter NFTs that are next to a road */
  adjacentToRoad?: boolean
  /** Filter NFTs by rentals that have periods that include any of the rental days */
  rentalDays?: number[]
  /**
   * Returns emotes that have sound
   */
  emoteHasSound?: boolean
  /**
   * Returns emotes that have additional geomtry
   */
  emoteHasGeometry?: boolean
} & Pick<RentalsListingsFilterBy, 'tenant'>

export enum NFTSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  RECENTLY_SOLD = 'recently_sold',
  CHEAPEST = 'cheapest',
  RENTAL_LISTING_DATE = 'rental_listing_date',
  RENTAL_DATE = 'rented_date',
  MAX_RENTAL_PRICE = 'max_rental_price',
  MIN_RENTAL_PRICE = 'min_rental_price'
}

export namespace NFT {
  export const schema: JSONSchema<NFT> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      tokenId: {
        type: 'string'
      },
      contractAddress: {
        type: 'string'
      },
      activeOrderId: {
        type: 'string',
        nullable: true
      },
      utility: {
        type: 'string',
        nullable: true
      },
      openRentalId: {
        type: 'string',
        nullable: true
      },
      owner: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      image: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
      data: {
        type: 'object',
        nullable: false,
        properties: {
          parcel: {
            type: 'object',
            properties: {
              description: {
                type: ['string'],
                nullable: true
              },
              x: {
                type: 'string'
              },
              y: {
                type: 'string'
              },
              estate: {
                type: 'object',
                properties: {
                  tokenId: {
                    type: 'string'
                  },
                  name: {
                    type: 'string'
                  }
                },
                required: ['tokenId', 'name'],
                nullable: true
              }
            },
            required: ['description', 'x', 'y', 'estate'],
            nullable: true
          },
          estate: {
            type: 'object',
            properties: {
              description: {
                type: ['string'],
                nullable: true
              },
              size: {
                type: 'integer'
              },
              parcels: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    x: {
                      type: 'number'
                    },
                    y: {
                      type: 'number'
                    }
                  },
                  required: ['x', 'y']
                }
              }
            },
            required: ['description', 'size', 'parcels'],
            nullable: true
          },
          wearable: {
            type: 'object',
            properties: {
              bodyShapes: {
                type: 'array',
                items: BodyShape.schema
              },
              category: WearableCategory.schema,
              description: {
                type: 'string'
              },
              rarity: Rarity.schema,
              isSmart: {
                type: 'boolean'
              }
            },
            required: ['bodyShapes', 'category', 'description', 'rarity', 'isSmart'],
            nullable: true
          },
          ens: {
            type: 'object',
            properties: {
              subdomain: {
                type: 'string'
              }
            },
            required: ['subdomain'],
            nullable: true
          },
          emote: {
            type: 'object',
            properties: {
              bodyShapes: {
                type: 'array',
                items: BodyShape.schema
              },
              category: EmoteCategory.schema,
              description: {
                type: 'string'
              },
              rarity: Rarity.schema,
              loop: {
                type: 'boolean'
              },
              hasSound: {
                type: 'boolean'
              },
              hasGeometry: {
                type: 'boolean'
              }
            },
            required: ['bodyShapes', 'category', 'description', 'rarity', 'loop'],
            nullable: true
          }
        },
        required: []
      },
      issuedId: {
        type: 'string',
        nullable: true
      },
      itemId: {
        type: 'string',
        nullable: true
      },
      category: NFTCategory.schema,
      network: Network.schema,
      chainId: ChainId.schema,
      createdAt: {
        type: 'integer'
      },
      updatedAt: {
        type: 'integer'
      },
      soldAt: {
        type: 'integer'
      },
      urn: {
        type: 'string',
        nullable: true
      }
    },
    required: [
      'id',
      'tokenId',
      'contractAddress',
      'activeOrderId',
      'openRentalId',
      'owner',
      'name',
      'image',
      'url',
      'data',
      'issuedId',
      'itemId',
      'category',
      'network',
      'chainId',
      'createdAt',
      'updatedAt',
      'soldAt'
    ]
  }

  export const validate: ValidateFunction<NFT> = generateLazyValidator(schema)
}
