import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { WearableCategory } from '../../dapps/wearable-category'
import { I18N } from './i18n'
import { WearableRepresentation } from './representation'
import { Metrics } from './metrics'
import {
  DisplayableDeployment,
  displayableProperties
} from '../shared/displayable'

/** @alpha */
export type BaseWearable = DisplayableDeployment & {
  id: string
  descriptions: I18N[]
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
}

/** @alpha */
export namespace BaseWearable {
  export const schema: JSONSchema<BaseWearable> = {
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
      }
    },
    additionalProperties: false,
    required: ['id', 'descriptions', 'names', 'data', 'thumbnail', 'image']
  }

  // Returns true only if there are no entries with the same locale
  export const validateDuplicatedLocales = (i18ns: I18N[]) =>
    i18ns.every(
      ({ code }, index) =>
        i18ns.findIndex((i18n) => i18n.code === code) === index
    )

  const schemaValidator: ValidateFunction<BaseWearable> =
    generateValidator(schema)
  export const validate: ValidateFunction<BaseWearable> = (
    wearable: any
  ): wearable is BaseWearable =>
    schemaValidator(wearable) &&
    validateDuplicatedLocales(wearable.descriptions) &&
    validateDuplicatedLocales(wearable.names)
}
