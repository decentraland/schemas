import { WearableCategory } from './wearable-category'
import { JSONSchema, ValidateFunction, generateLazyValidator } from '../../../validation'
import { BodyPartCategory } from './body-part-category'

export type HideableWearableCategory = WearableCategory | BodyPartCategory

export namespace HideableWearableCategory {
  export const schema: JSONSchema<BodyPartCategory> = {
    oneOf: [{ ...WearableCategory.schema }, { ...BodyPartCategory.schema }]
  }

  export const validate: ValidateFunction<BodyPartCategory> = generateLazyValidator(schema)
}
