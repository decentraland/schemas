import type { JSONSchema } from '../validation/types.js'

export enum ListingStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled'
}

export const listingStatusSchema: JSONSchema<ListingStatus> = {
  type: 'string',
  enum: Object.values(ListingStatus)
}
