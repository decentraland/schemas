import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../validation'
import { WearableCategory } from '../../../dapps/wearable-category'
import { WearableRepresentation } from './representation'
import {
  BaseItem,
  baseItemProperties,
  requiredBaseItemProps
} from '../base-item'
import { StandardProps, standardProperties } from '../standard-props'
import { isThirdParty, ThirdPartyProps, thirdPartyProps } from '../third-party-props'

/** @alpha */
export type Wearable = BaseItem & {
  data: {
    replaces: WearableCategory[]
    hides: WearableCategory[]
    tags: string[]
    representations: WearableRepresentation[]
    category: WearableCategory
  }
} & (StandardProps | ThirdPartyProps)

/** @alpha */
export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    type: 'object',
    properties: {
      ...baseItemProperties,
      ...standardProperties,
      ...thirdPartyProps,
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
      }
    },
    additionalProperties: true,
    required: [...requiredBaseItemProps, 'data'],
    oneOf: [
      {
        required: ['collectionAddress', 'rarity'],
        prohibited: ['merkleProof', 'content'],
        errorMessage:
          'for standard wearables "merkleProof" and "content" are not allowed'
      },
      {
        required: ['merkleProof', 'content'],
        _isThirdParty: true,
        prohibited: ['collectionAddress', 'rarity'],
        errorMessage:
          'for third party wearables "collectionAddress" and "rarity" are not allowed'
      }
    ]
  }

  const _isThirdPartyKeywordDef = {
    keyword: '_isThirdParty',
    validate: (schema: boolean, data: any) => !schema || isThirdParty(data),
    errors: false
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
   export const validate = generateValidator(schema, [_isThirdPartyKeywordDef])
}
