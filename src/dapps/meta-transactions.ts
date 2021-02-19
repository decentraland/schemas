import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

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
export namespace MetaTransaction {
  export const schema: JSONSchema<MetaTransaction> = {
    type: 'object',
    properties: {
      from: { type: 'string' },
      params: {
        type: 'array',
        items: [{ type: 'string' }, { type: 'string' }],
        additionalItems: false,
        minItems: 2,
      },
    },
    additionalProperties: false,
    required: ['from', 'params'],
  }

  export const validate: ValidateFunction<MetaTransaction> = generateValidator(
    schema
  )
}
