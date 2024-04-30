import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { SubscriptionDetails } from './subscription-details'
import { EthAddress } from '../../misc'
import { Email } from '../../misc/email'

/**
 * Subscription returned by the notifications-workers
 * @alpha
 */
export type Subscription = {
  address: EthAddress
  email: string | undefined
  details: SubscriptionDetails
}

/**
 * Subscription schema and validator function
 * @alpha
 */
export namespace Subscription {
  export const schema: JSONSchema<Subscription> = {
    type: 'object',
    required: ['address', 'details'],
    properties: {
      address: EthAddress.schema,
      email: { ...Email.schema, nullable: true },
      details: SubscriptionDetails.schema
    }
  }

  export const validate: ValidateFunction<Subscription> = generateLazyValidator(schema)
}
