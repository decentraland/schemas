import { Network } from '..'
import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

export type Account = {
  id: string
  address: string
  sales: number
  purchases: number
  spent: string
  earned: string
  royalties: string
}

export enum AccountSortBy {
  MOST_SALES = 'most_sales',
  MOST_PURCHASES = 'most_purchases',
  MOST_SPENT = 'most_spent',
  MOST_EARNED = 'most_earned',
  MOST_ROYALTIES = 'most_royalties'
}

export type AccountFilters = {
  first?: number
  skip?: number
  sortBy?: AccountSortBy
  id?: string
  address?: string
  network?: Network
}

export namespace Account {
  export const schema: JSONSchema<Account> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      address: {
        type: 'string'
      },
      sales: {
        type: 'integer'
      },
      purchases: {
        type: 'integer'
      },
      spent: {
        type: 'string'
      },
      earned: {
        type: 'string'
      },
      royalties: {
        type: 'string'
      }
    },
    required: [
      'id',
      'address',
      'sales',
      'purchases',
      'spent',
      'earned',
      'royalties'
    ]
  }

  export const validate: ValidateFunction<Account> = generateValidator(schema)
}
