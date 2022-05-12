import { ProjectType } from './../project/type'
import { WearableCategory } from './../../dapps/wearable-category'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { Rarity } from './../../dapps/rarity'
import { AssetWearableGender } from './asset-wearable-gender'
import { Wearable } from '../../platform'

/** @alpha */
export type SmartWearableJson = Pick<
  Wearable,
  'id' | 'name' | 'description' | 'thumbnail' | 'rarity' | 'data'
>

/** @alpha */
export namespace AssetJson {
  export const schema: JSONSchema<SmartWearableJson> = {
    type: 'object',
    properties: {
      id: {
        description:
          'The ID that you will replace in your collection. Also this ID is used for develop purpose, to identify in the kernel.',
        type: 'string'
      },
      assetType: ProjectType.schema,
      name: {
        description: '',
        type: 'string'
      },
      description: {
        description: 'A short text that describes the wearable.`',
        type: 'string'
      },
      thumbnail: {
        description: 'A preview image of your item.',
        type: 'string'
      },
      model: {
        description: 'The main file that should be loaded as wearable.',
        type: 'string'
      },
      category: WearableCategory.schema,
      rarity: Rarity.schema,
      bodyShape: AssetWearableGender.schema
    },
    additionalProperties: true,
    required: ['category', 'rarity', 'bodyShape', 'thumbnail', 'model']
  }

  export const validate: ValidateFunction<AssetJson> = generateValidator(schema)
}
