import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { SubscriptionDetails } from './subscription-details'
import { EthAddress } from '../../misc'

export type Subscription = {
  address: EthAddress
  details: SubscriptionDetails
}

export namespace Subscription {
  export const schema: JSONSchema<Subscription> = {
    type: 'object',
    required: ['address', 'details'],
    properties: {
      address: EthAddress.schema,
      details: SubscriptionDetails.schema
    }
  }

  export const validate: ValidateFunction<Subscription> = generateLazyValidator(schema)
}
