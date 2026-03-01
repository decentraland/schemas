import { IPFSv1, IPFSv2, ipfsv1Schema, ipfsv2Schema } from '../misc/index.js'
import { ContentMapping, contentMappingSchema } from '../misc/content-mapping.js'
import type { JSONSchema } from '../validation/types.js'

/**
 * Non-exhaustive list of EntityTypes.
 * @public
 */
export enum EntityType {
  SCENE = 'scene',
  PROFILE = 'profile',
  WEARABLE = 'wearable',
  STORE = 'store',
  EMOTE = 'emote',
  OUTFITS = 'outfits'
}

/**
 * Internal representation of an entity in the catalyst.
 *
 * This Entity's content mappings adhere to ADR45.
 *
 * @public
 */
export type Entity = {
  /** @deprecated ADR45 removed entity versions. */
  version: string
  id: IPFSv1 | IPFSv2
  type: EntityType
  pointers: string[]
  timestamp: number
  content: ContentMapping[]
  metadata?: any
}

/** @public */
export const entitySchema: JSONSchema<Entity> = {
  type: 'object',
  properties: {
    version: { type: 'string', enum: ['v3'] },
    id: { type: 'string', oneOf: [ipfsv1Schema, ipfsv2Schema] },
    type: { type: 'string' },
    pointers: { type: 'array', items: { type: 'string', minLength: 1 } },
    timestamp: { type: 'number', minimum: 0 },
    content: { type: 'array', items: contentMappingSchema },
    metadata: { type: 'object', nullable: true }
  },
  required: ['version', 'id', 'type', 'pointers', 'timestamp', 'content']
}
