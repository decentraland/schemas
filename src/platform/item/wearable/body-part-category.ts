import type { JSONSchema } from '../../../validation/types.js'

export enum BodyPartCategory {
  HEAD = 'head',
  HANDS = 'hands'
}

export const bodyPartCategorySchema: JSONSchema<BodyPartCategory> = {
  type: 'string',
  enum: Object.values(BodyPartCategory)
}
