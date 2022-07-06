import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export enum SaleType {
  ORDER = 'order',
  BID = 'bid',
  MINT = 'mint'
}

export namespace SaleType {
  export const schema: JSONSchema<SaleType> = {
    type: 'string',
    enum: Object.values(SaleType)
  }

  export const validate: ValidateFunction<SaleType> = generateLazyValidator(schema)
}
