import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../validation'
import { ChainId } from './chain-id'
import { BodyShape, EmoteCategory } from '../platform'
import { Network } from './network'
import { NFTCategory } from './nft-category'
import { Rarity } from './rarity'
import { WearableCategory } from './wearable-category'
import { Item, ItemFilters } from './item'

/**
 * Representation of the Item returned for the Marketplace's catalog.
 * @public
 */
export type CatalogItem = Pick<
  Item,
  | 'id'
  | 'name'
  | 'contractAddress'
  | 'thumbnail'
  | 'url'
  | 'rarity'
  | 'category'
  | 'creator'
  | 'data'
  | 'network'
  | 'chainId'
  | 'available'
  | 'isOnSale'
  | 'price'
  | 'picks'
> & {
  minPrice: string
  minListingPrice: string | null
  maxListingPrice: string | null
  listings: number | null
  owners: number | null
}

/**
 * All the possible sort options for the Marketplace's catalog.
 * @public
 */
export enum CatalogSortBy {
  NEWEST = 'newest',
  RECENTLY_SOLD = 'recently_sold',
  CHEAPEST = 'cheapest',
  MOST_EXPENSIVE = 'most_expensive',
  RECENTLY_LISTED = 'recently_listed'
}

/**
 * All the possible sort directions.
 * @public
 */
export enum CatalogSortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * All the possible Marketplace's catalog filters.
 * @public
 */
export type CatalogFilters = Pick<
  ItemFilters,
  | 'first'
  | 'skip'
  | 'category'
  | 'creator'
  | 'isSoldOut'
  | 'isOnSale'
  | 'search'
  | 'isWearableHead'
  | 'isWearableSmart'
  | 'isWearableAccessory'
  | 'isWearableAccessory'
  | 'wearableCategory'
  | 'rarities'
  | 'wearableGenders'
  | 'emoteCategory'
  | 'emoteGenders'
  | 'emotePlayMode'
  | 'contractAddresses'
  | 'itemId'
  | 'network'
  | 'minPrice'
  | 'maxPrice'
> & {
  onlyMinting?: boolean
  onlyListing?: boolean
  sortBy?: CatalogSortBy
  sortDirection?: CatalogSortDirection
  limit?: number
  offset?: number
}

/**
 * @public
 */
export namespace CatalogItem {
  export const schema: JSONSchema<CatalogItem> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      contractAddress: {
        type: 'string'
      },
      name: {
        type: 'string'
      },
      thumbnail: {
        type: 'string'
      },
      rarity: {
        type: 'string'
      },
      creator: {
        type: 'string'
      },
      url: {
        type: 'string'
      },
      available: {
        type: 'integer'
      },
      isOnSale: {
        type: 'boolean'
      },
      price: {
        type: 'string'
      },
      maxListingPrice: {
        type: 'string'
      },
      minListingPrice: {
        type: 'string'
      },
      minPrice: {
        type: 'string'
      },
      listings: {
        type: 'integer'
      },
      owners: {
        type: 'integer'
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
            required: [
              'bodyShapes',
              'category',
              'description',
              'rarity',
              'isSmart'
            ],
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
              }
            },
            required: [
              'bodyShapes',
              'category',
              'description',
              'rarity',
              'loop'
            ],
            nullable: true
          }
        },
        required: []
      },
      category: NFTCategory.schema,
      network: Network.schema,
      chainId: ChainId.schema
    },
    required: [
      'id',
      'name',
      'contractAddress',
      'thumbnail',
      'url',
      'rarity',
      'category',
      'creator',
      'data',
      'network',
      'chainId',
      'available',
      'isOnSale',
      'price'
    ]
  }

  export const validate: ValidateFunction<CatalogItem> =
    generateLazyValidator(schema)
}
