import { JSONSchemaType } from 'ajv'
import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../validation'
import { ChainId } from './chain-id'
import { Network } from './network'
import { NFTCategory } from './nft-category'

/**
 * All the possible rental statuses.
 * (This will be merged into ListingStatus eventually)
 */
export enum RentalStatus {
  OPEN = 'open',
  CANCELLED = 'cancelled',
  EXECUTED = 'executed'
}

/**
 * All the possible sort directions.
 */
export enum RentalsListingSortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

/**
 * All the possible NFT categories of a rental listing.
 */
export enum RentalsListingsFilterByCategory {
  LAND = 'land',
  ESTATE = 'estate'
}

/**
 * All the possible parameters that a rental listing can be sorted by.
 */
export enum RentalsListingsSortBy {
  /** Order by created at of the listing's metadata */
  LAND_CREATION_DATE = 'land_creation_date',
  /** Order by created at of the listing */
  RENTAL_LISTING_DATE = 'rental_listing_date',
  /** Order by rented at of the listing */
  RENTAL_DATE = 'rented_date',
  /** Order by search text of the listing's metadata */
  NAME = 'name',
  /** Order by maximum rental price per day of the listing */
  MAX_RENTAL_PRICE = 'max_rental_price',
  /** Order by minimum rental price per day of the listing */
  MIN_RENTAL_PRICE = 'min_rental_price'
}

/**
 * All the possible parameters that a rental can be filtered for based on their periods.
 */
export type RentalsListingsFilterByPeriod = {
  /** The minimum amount of days of the period */
  minDays: number
  /** The maximum amount of days of the period */
  maxDays: number
  /** The price per day */
  pricePerDay?: number
}

/**
 * All the possible parameters that a rental can be filtered for.
 */
export type RentalsListingsFilterBy = {
  /** The category of the NFT being rented */
  category?: RentalsListingsFilterByCategory
  /** The blockchain search text of the NFT asset */
  text?: string
  /** The listing status of the NFT asset rental */
  status?: RentalStatus
  /** The periods of the rental listings the NFT assets where put for rent */
  periods?: RentalsListingsFilterByPeriod
  /** The address of the lessor who put the NFT asset for rent */
  lessor?: string
  /** The address of the tenant who rented the NFT asset */
  tenant?: string
  /** The token id of the NFT asset that was put for rent */
  tokenId?: string
  /** The contract address of the NFT asset that was put for rent  */
  contractAddresses?: string[]
  /** The network of the NFT that was put for rent */
  network?: Network
  /** The NFT ids of the NFT assets that were put for rent */
  nftIds?: string[]
}

/**
 * A rental listing.
 */
export type RentalListing = {
  /** The ID of the rental listing in the signature server */
  id: string
  /** The NFT token ID */
  nftId: string
  /** The category of the NFT being rented */
  category: NFTCategory
  /** The blockchain search text of the NFT asset */
  searchText: string
  /** The network where the asset being rented is on */
  network: Network
  /** The chain id where the asset being rented is on */
  chainId: ChainId
  /** UTC timestamp in milliseconds since epoch of the signature's expiration */
  expiration: number
  /** A hex string representation of the rental signature */
  signature: string
  /** A string representation of the nonces, the first nonce is the contract's nonce, the second one is the signer's nonce and the third is the asset's nonce */
  nonces: string[]
  /** The NFT token id */
  tokenId: string
  /** The contract address of the NFT */
  contractAddress: string
  /** The contract address of the rentals contract */
  rentalContractAddress: string
  /** The address of the lessor */
  lessor: string | null
  /** The address of the tenant */
  tenant: string | null
  /** The status of the rental */
  status: RentalStatus
  /** UTC timestamp in milliseconds since epoch of the time the signature was created */
  createdAt: number
  /** UTC timestamp in milliseconds since epoch of the time the signature was updated */
  updatedAt: number
  /** UTC timestamp in milliseconds since epoch of the time the rental started */
  startedAt: number | null
  /** The periods of the rental */
  periods: RentalListingPeriod[]
}

/**
 * A period of a rental listing.
 */
export type RentalListingPeriod = {
  /** The minimum amount of days of the period */
  minDays: number
  /** The maximum amount of days of the period */
  maxDays: number
  /** The price per day */
  pricePerDay: string
}

/**
 * The input that is required to create a rental listing.
 */
export type RentalListingCreation = {
  /** The network where the asset being rented is on */
  network: Network
  /** The chain id where the asset being rented is on */
  chainId: ChainId
  /** UTC timestamp in milliseconds since epoch of the signature's expiration */
  expiration: number
  /** A hex string representation of the rental signature */
  signature: string
  /** The NFT token id */
  tokenId: string
  /** The contract address of the NFT */
  contractAddress: string
  /** The contract address of the rentals contract */
  rentalContractAddress: string
  /** A string representation of the nonces, the first nonce is the contract's nonce, the second one is the signer's nonce and the third is the asset's nonce */
  nonces: string[]
  /** The periods of the rental */
  periods: PeriodCreation[]
}

/**
 * The input that is required to create a rental listing period.
 */
export type PeriodCreation = {
  /** The minimum amount of days of the period */
  minDays: number
  /** The maximum amount of days of the period */
  maxDays: number
  /** The price per day */
  pricePerDay: string
}

export namespace PeriodCreation {
  export const schema: JSONSchemaType<PeriodCreation> = {
    type: 'object',
    properties: {
      minDays: { type: 'integer', minimum: 0, maximum: 2147483647 },
      maxDays: { type: 'integer', minimum: 0, maximum: 2147483647 },
      pricePerDay: { type: 'string', pattern: '^[0-9]+$' }
    },
    additionalProperties: false,
    required: ['minDays', 'maxDays', 'pricePerDay']
  }

  export const validate: ValidateFunction<PeriodCreation> =
    generateLazyValidator(schema)
}

export namespace RentalListingCreation {
  export const schema: JSONSchema<RentalListingCreation> = {
    type: 'object',
    properties: {
      network: Network.schema as JSONSchemaType<Network>,
      chainId: ChainId.schema as JSONSchemaType<ChainId>,
      expiration: { type: 'number', minimum: 0 },
      signature: { type: 'string', minLength: 1 },
      tokenId: { type: 'string', minLength: 1 },
      nonces: {
        type: 'array',
        minItems: 3,
        maxItems: 3,
        items: {
          minLength: 1,
          type: 'string',
          pattern: '^[0-9]+$'
        }
      },
      contractAddress: { type: 'string', pattern: '^0x[a-fA-F0-9]{40}$' },
      rentalContractAddress: { type: 'string', pattern: '^0x[a-fA-F0-9]{40}$' },
      periods: {
        type: 'array',
        minItems: 1,
        maxItems: 100,
        uniqueItems: true,
        items: PeriodCreation.schema
      }
    },
    additionalProperties: false,
    required: [
      'network',
      'chainId',
      'expiration',
      'signature',
      'nonces',
      'tokenId',
      'contractAddress',
      'rentalContractAddress',
      'periods'
    ]
  }
  export const validate: ValidateFunction<RentalListingCreation> =
    generateLazyValidator(schema)
}
