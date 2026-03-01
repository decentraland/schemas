import type { JSONSchema } from '../validation/types.js'

/**
 * Meta-transaction to be relayed
 * @alpha
 */
export type MetaTransaction = {
  from: string
  params: [string, string] // manaAddress, txData
}

/**
 * @alpha
 */
export const metaTransactionSchema: JSONSchema<MetaTransaction> = {
  type: 'object',
  properties: {
    from: { type: 'string' },
    params: {
      type: 'array',
      items: [{ type: 'string' }, { type: 'string' }],
      additionalItems: false,
      minItems: 2
    }
  },
  additionalProperties: false,
  required: ['from', 'params']
}
