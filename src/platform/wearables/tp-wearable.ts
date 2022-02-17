import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { BaseWearable } from './base-wearable'

/** @alpha */
export type TPWearable = BaseWearable & {
  merkleTreeProof: {
    index: number
    hashes: string[]
  }
}

/** @alpha */
export namespace TPWearable {
  export const schema: JSONSchema<TPWearable> = {
    ...BaseWearable.schema,
    properties: {
      ...BaseWearable.schema.properties!,
      merkleTreeProof: {
        type: 'object',
        properties: {
          index: {
            type: 'number'
          },
          hashes: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        },
        required: ['index', 'hashes']
      }
    },
    required: [...BaseWearable.schema.required, 'merkleTreeProof']
  }

  const schemaValidator: ValidateFunction<TPWearable> =
    generateValidator(schema)
  export const validate: ValidateFunction<TPWearable> = (
    wearable: any
  ): wearable is TPWearable =>
    schemaValidator(wearable) &&
    BaseWearable.validateDuplicatedLocales(wearable.descriptions) &&
    BaseWearable.validateDuplicatedLocales(wearable.names)
}
