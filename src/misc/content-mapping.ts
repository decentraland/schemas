import { IPFSv1, IPFSv2, ipfsv1Schema, ipfsv2Schema } from '../misc/index.js'
import type { JSONSchema } from '../validation/types.js'

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
export const contentMappingSchema: JSONSchema<ContentMapping> = {
  type: 'object',
  properties: {
    file: { type: 'string', minLength: 1 },
    hash: { type: 'string', oneOf: [ipfsv1Schema, ipfsv2Schema] }
  },
  required: ['file', 'hash']
}
