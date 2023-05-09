import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/**
 * Merkle Proof
 * @alpha
 */
export type MerkleProof = {
  proof: string[]
  index: number
  hashingKeys: string[]
  entityHash: string
}

/**
 * Merkle Proof
 * @alpha
 */
export namespace MerkleProof {
  export const schema: JSONSchema<MerkleProof> = {
    type: 'object',
    properties: {
      proof: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      index: {
        type: 'number'
      },
      hashingKeys: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      entityHash: {
        type: 'string'
      }
    },
    required: ['entityHash', 'hashingKeys', 'index', 'proof'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<MerkleProof> = generateLazyValidator(schema)
}
