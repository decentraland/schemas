import { WearableCategory, wearableCategorySchema } from './wearable-category.js'
import type { JSONSchema } from '../../../validation/types.js'
import { BodyPartCategory, bodyPartCategorySchema } from './body-part-category.js'

export type HideableWearableCategory = WearableCategory | BodyPartCategory

export const hideableWearableCategorySchema: JSONSchema<BodyPartCategory> = {
  oneOf: [{ ...wearableCategorySchema }, { ...bodyPartCategorySchema }]
}
