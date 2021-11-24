import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
import { BodyShape } from './body-shape'
import { ChainId } from './chain-id'
import { Network } from './network'
import { NFTCategory } from './nft-category'
import { Rarity } from './rarity'
import { WearableCategory } from './wearable-category'
import { WearableGender } from './wearable-gender'

export type NFT = {
  id: string
  contractAddress: string
  tokenId: string
  activeOrderId: string | null
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
    }
    ens?: {
      subdomain: string
    }
  }
  network: Network
  chainId: ChainId
  createdAt: number
  updatedAt: number
  soldAt: number
}

export type NFTFilters = {
  first?: number
  skip?: number
  sortBy?: NFTSortBy
  category?: NFTCategory
  owner?: string
  isOnSale?: boolean
  search?: string
  itemRarities?: Rarity[]
  isLand?: boolean
  isWearableHead?: boolean
  isWearableAccessory?: boolean
  wearableCategory?: WearableCategory
  wearableGenders?: WearableGender[]
  contractAddresses?: string[]
  tokenId?: string
  itemId?: string
  network?: Network
}

export enum NFTSortBy {
  NAME = 'name',
  NEWEST = 'newest',
  RECENTLY_LISTED = 'recently_listed',
  RECENTLY_SOLD = 'recently_sold',
  CHEAPEST = 'cheapest'
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
        type: ['string'],
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
              rarity: Rarity.schema
            },
            required: ['bodyShapes', 'category', 'description', 'rarity'],
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
      }
    },
    required: [
      'id',
      'tokenId',
      'contractAddress',
      'activeOrderId',
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

  export const validate: ValidateFunction<NFT> = generateValidator(schema)
}
