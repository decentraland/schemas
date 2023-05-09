import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export enum ListingStatus {
  OPEN = 'open',
  SOLD = 'sold',
  CANCELLED = 'cancelled'
}

export namespace ListingStatus {
  export const schema: JSONSchema<ListingStatus> = {
    type: 'string',
    enum: Object.values(ListingStatus)
  }

  export const validate: ValidateFunction<ListingStatus> = generateLazyValidator(schema)
}
