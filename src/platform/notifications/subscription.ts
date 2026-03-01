import type { JSONSchema } from '../../validation/types.js'
import { SubscriptionDetails, subscriptionDetailsSchema } from './subscription-details.js'
import { EthAddress, ethAddressSchema } from '../../misc/index.js'
import { emailSchema } from '../../misc/email.js'

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
export const subscriptionSchema: JSONSchema<Subscription> = {
  type: 'object',
  required: ['address', 'details'],
  properties: {
    address: ethAddressSchema,
    email: { ...emailSchema, nullable: true },
    details: subscriptionDetailsSchema
  }
}
