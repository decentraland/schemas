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
  descriptions: I18N[]
  collectionAddress?: string
  rarity?: Rarity
  names: I18N[]
  data: {
    replaces: WearableCategory[]
    hides: WearableCategory[]
    tags: string[]
    representations: WearableRepresentation[]
    category: WearableCategory
  }
  thumbnail: string
  image: string
  metrics?: Metrics
  content?: any
  merkleProof?: MerkleProof
}

/** @alpha */
export type StandardWearable = Omit<
  WithRequired<Wearable, 'collectionAddress' | 'rarity'>,
  'merkleProof'
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
      descriptions: {
        type: 'array',
        items: I18N.schema,
        minItems: 1
      },
      collectionAddress: {
        type: 'string',
        nullable: true
      },
      rarity: {
        ...Rarity.schema,
        nullable: true
      },
      names: {
        type: 'array',
        items: I18N.schema,
        minItems: 1
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
        additionalProperties: false,
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
        nullable: true
      }
    },
    additionalProperties: true,
    required: ['id', 'descriptions', 'names', 'data', 'thumbnail', 'image']
  }

  const schemaValidator: ValidateFunction<Wearable> = generateValidator(schema)
  export const validate: ValidateFunction<Wearable> = (
    wearable: any
  ): wearable is Wearable =>
    schemaValidator(wearable) &&
    validateDuplicatedLocales(wearable.descriptions) &&
    validateDuplicatedLocales(wearable.names) &&
    XOR(
      validateStandardWearable(wearable.rarity, wearable.collectionAddress),
      validateThirdParty(wearable)
    )

  const XOR = (b1: boolean, b2: boolean) => (b1 && !b2) || (b2 && !b1)
  // Returns true only if there are no entries with the same locale
  const validateDuplicatedLocales = (i18ns: I18N[]) =>
    i18ns.every(
      ({ code }, index) =>
        i18ns.findIndex((i18n) => i18n.code === code) === index
    )
}
