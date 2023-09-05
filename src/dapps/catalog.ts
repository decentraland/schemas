import { ItemFilters } from './item'

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
  | 'ids'
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
  | 'urns'
  | 'emoteHasGeometry'
  | 'emoteHasSound'
> & {
  onlyMinting?: boolean
  onlyListing?: boolean
  sortBy?: CatalogSortBy
  sortDirection?: CatalogSortDirection
  limit?: number
  offset?: number
}
