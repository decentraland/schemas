import type { JSONSchema } from '../validation/types.js'

export enum SaleType {
  ORDER = 'order',
  BID = 'bid',
  MINT = 'mint'
}

export const saleTypeSchema: JSONSchema<SaleType> = {
  type: 'string',
  enum: Object.values(SaleType)
}
