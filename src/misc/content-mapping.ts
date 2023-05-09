import { IPFSv1, IPFSv2 } from '../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

/**
 * Represents a content mapping. The Decentraland file system is
 * case-insensitive. `file` must be lower cased.
 *
 * Duplicated files will throw a validation error.
 *
 * .file is a relative path
 * .hash is a valid IPFS hash.
 *
 * @public
 */
export type ContentMapping = {
  file: string
  hash: IPFSv1 | IPFSv2
}

/** @public */
export namespace ContentMapping {
  export const schema: JSONSchema<ContentMapping> = {
    type: 'object',
    properties: {
      file: { type: 'string', minLength: 1 },
      hash: { type: 'string', oneOf: [IPFSv1.schema, IPFSv2.schema] }
    },
    required: ['file', 'hash']
  }

  export const validate: ValidateFunction<ContentMapping> = generateLazyValidator(schema)
}
