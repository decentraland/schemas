import { Store } from '../dapps/store'
import { IPFSv1, IPFSv2 } from '../misc'
import { ContentMapping } from '../misc/content-mapping'
import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
import { Emote, Wearable } from './item'
import { _containsHashingKeys } from './item/third-party-props'
import { Profile } from './profile'
import { Scene } from './scene'

/**
 * Non-exhaustive list of EntityTypes.
 * @public
 */
export enum EntityType {
  SCENE = 'scene',
  PROFILE = 'profile',
  WEARABLE = 'wearable',
  STORE = 'store',
  EMOTE = 'emote'
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
  metadata?: Profile | Scene | Store | Wearable | Emote
}

/** @public */
export namespace Entity {
  export const schema: JSONSchema<Entity> = {
    type: 'object',
    properties: {
      version: { type: 'string', enum: ['v3'] },
      id: { type: 'string', oneOf: [IPFSv1.schema, IPFSv2.schema] },
      type: { type: 'string', enum: Object.values(EntityType) },
      pointers: { type: 'array', items: { type: 'string', minLength: 1 } },
      timestamp: { type: 'number', minimum: 0 },
      content: { type: 'array', items: ContentMapping.schema },
      metadata: {
        type: 'object',
        nullable: true,
        required: []
      }
    },
    if: { properties: { type: { const: EntityType.PROFILE } } },
    then: { properties: { metadata: Profile.schema } },
    else: {
      if: { properties: { type: { const: EntityType.SCENE } } },
      then: { properties: { metadata: Scene.schema } },
      else: {
        if: { properties: { type: { const: EntityType.WEARABLE } } },
        then: { properties: { metadata: Wearable.schema } },
        else: {
          if: { properties: { type: { const: EntityType.STORE } } },
          then: { properties: { metadata: Store.schema } },
          else: {
            if: { properties: { type: { const: EntityType.EMOTE } } },
            then: { properties: { metadata: Emote.schema } }
          }
        }
      }
    },
    errorMessage: {
      if: 'metadata schema for ${0/type} is invalid'
    },
    required: ['version', 'id', 'type', 'pointers', 'timestamp', 'content']
  }

  export const validate: ValidateFunction<Entity> = generateValidator(schema, [
    Emote._isThirdPartyKeywordDef,
    _containsHashingKeys
  ])
}
