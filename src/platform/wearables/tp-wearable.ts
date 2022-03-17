import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { MerkleProof } from '../merkle-tree'
import { BaseWearable } from './base-wearable'

/** @alpha */
export type TPWearable = BaseWearable & {
  content: Record<string, string>
  merkleProof: MerkleProof
}

/** @alpha */
export namespace TPWearable {
  export const schema: JSONSchema<TPWearable> = {
    ...BaseWearable.schema,
    properties: {
      ...BaseWearable.schema.properties!,
      content: {
        type: 'object',
        additionalProperties: { type: 'string' },
        required: []
      },
      merkleProof: MerkleProof.schema
    },
    required: [...BaseWearable.schema.required, 'content']
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
