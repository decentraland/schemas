import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { Rarity } from '../../dapps/rarity'
import { WearableCategory } from '../../dapps/wearable-category'
import { I18N } from './i18n'
import { WearableRepresentation } from './representation'
import { Metrics } from './metrics'
import {
  DisplayableDeployment,
  displayableProperties
} from '../shared/displayable'
import { MerkleProof } from '../merkle-tree'
import { WithRequired } from '../../misc'

/** @alpha */
export type Wearable = DisplayableDeployment & {
  id: string
  name: string
  description: string
  data: {
    replaces: WearableCategory[]
    hides: WearableCategory[]
    tags: string[]
    representations: WearableRepresentation[]
    category: WearableCategory
  }
  i18n: I18N[]
  thumbnail: string
  image: string
  rarity?: Rarity
  collectionAddress?: string
  metrics?: Metrics
  content?: Record<string, string>
  merkleProof?: MerkleProof
}

/** @alpha */
export type StandardWearable = Omit<
  WithRequired<Wearable, 'collectionAddress' | 'rarity'>,
  'merkleProof' | 'content'
>

export type ThirdPartyWearable = Omit<
  WithRequired<Wearable, 'merkleProof'>,
  'rarity' | 'collectionAddress'
>

const validateThirdParty = (wearable: Wearable) => {
  if (!MerkleProof.validate(wearable.merkleProof)) return false
  if (wearable.merkleProof.hashingKeys.length === 0) return false
  const containsAllKeys = wearable.merkleProof.hashingKeys.every((key) =>
    wearable.hasOwnProperty(key)
  )

  const proofIsNotEmpty = wearable.merkleProof.proof.length > 0

  return containsAllKeys && proofIsNotEmpty
}

const validateStandardWearable = (
  rarity?: Rarity,
  collectionAddress?: string
) => Rarity.validate(rarity) && !!collectionAddress

export const isStandard = (wearable: Wearable): wearable is StandardWearable =>
  validateStandardWearable(wearable.rarity, wearable.collectionAddress)

export const isThirdParty = (
  wearable: Wearable
): wearable is ThirdPartyWearable => validateThirdParty(wearable)

/** @alpha */
export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    type: 'object',
    properties: {
      ...displayableProperties,
      id: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      collectionAddress: {
        type: 'string',
        nullable: true
      },
      rarity: {
        ...Rarity.schema,
        nullable: true
      },
      name: {
        type: 'string'
      },
      i18n: {
        type: 'array',
        items: I18N.schema,
        minItems: 1,
        uniqueItemProperties: ['code'],
        errorMessage: '${0#} array should not have duplicates for "code"'
      },
      data: {
        type: 'object',
        properties: {
          replaces: {
            type: 'array',
            items: WearableCategory.schema
          },
          hides: {
            type: 'array',
            items: WearableCategory.schema
          },
          tags: {
            type: 'array',
            items: {
              type: 'string',
              minLength: 1
            }
          },
          representations: {
            type: 'array',
            items: WearableRepresentation.schema,
            minItems: 1
          },
          category: WearableCategory.schema
        },
        required: ['replaces', 'hides', 'tags', 'representations', 'category']
      },
      thumbnail: {
        type: 'string'
      },
      image: {
        type: 'string'
      },
      metrics: {
        ...Metrics.schema,
        nullable: true
      },
      merkleProof: {
        ...MerkleProof.schema,
        nullable: true
      },
      content: {
        type: 'object',
        nullable: true,
        additionalProperties: { type: 'string' },
        required: []
      }
    },
    additionalProperties: true,
    required: [
      'id',
      'description',
      'name',
      'data',
      'thumbnail',
      'image',
      'i18n'
    ],
    "anyOf": [
      {
        required: ["collectionAddress", "rarity"],
        prohibited: ["merkleProof", "content"],
        errorMessage: 'for standard wearables "merkleProof" and "content" are not allowed'
      },
      {
        required: ["merkleProof", "content"],
        prohibited: ["collectionAddress", "rarity"],
        errorMessage: 'for third party wearables "collectionAddress" and "rarity" are not allowed',
      }
    ],
  }

  /**
   * Validates that the wearable metadata complies with the standard or third party wearable, and doesn't have repeated locales.
   * Some fields are defined as optional but those are validated to be present as standard XOR third party:
   *  Standard Wearables should contain:
   *    - collectionAddress
   *    - rarity
   *  Third Party Wearables should contain:
   *    - merkleProof
   *    - content
   */
  export const validate: ValidateFunction<Wearable> = generateValidator(schema)
}
