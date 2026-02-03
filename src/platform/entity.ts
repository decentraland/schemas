import { IPFSv1, IPFSv2 } from '../misc'
import { ContentMapping } from '../misc/content-mapping'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

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
export namespace Entity {
  export const schema: JSONSchema<Entity> = {
    type: 'object',
    properties: {
      version: { type: 'string', enum: ['v3'] },
      id: { type: 'string', oneOf: [IPFSv1.schema, IPFSv2.schema] },
      type: { type: 'string' },
      pointers: { type: 'array', items: { type: 'string', minLength: 1 } },
      timestamp: { type: 'number', minimum: 0 },
      content: { type: 'array', items: ContentMapping.schema },
      metadata: { type: 'object', nullable: true }
    },
    required: ['version', 'id', 'type', 'pointers', 'timestamp', 'content']
  }

  export const validate: ValidateFunction<Entity> = generateLazyValidator(schema)
}
