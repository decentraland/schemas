import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { Rarity } from '../../dapps/rarity'
import { BaseWearable } from './base-wearable'

/** @alpha */
export type Wearable = BaseWearable & {
  rarity: Rarity
  collectionAddress: string
}

/** @alpha */
export namespace Wearable {
  export const schema: JSONSchema<Wearable> = {
    ...BaseWearable.schema,
    properties: {
      ...BaseWearable.schema.properties!,
      collectionAddress: {
        type: 'string'
      },
      rarity: Rarity.schema,
    },
    required: [
      ...BaseWearable.schema.required,
      'collectionAddress',
      'rarity',
    ]
  }

  const schemaValidator: ValidateFunction<Wearable> = generateValidator(schema)
  export const validate: ValidateFunction<Wearable> = (
    wearable: any
  ): wearable is Wearable =>
    schemaValidator(wearable) &&
    BaseWearable.validateDuplicatedLocales(wearable.descriptions) &&
    BaseWearable.validateDuplicatedLocales(wearable.names)
}
