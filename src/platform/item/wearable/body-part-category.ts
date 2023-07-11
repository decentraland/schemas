import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum BodyPartCategory {
  HEAD = 'head',
  HANDS = 'hands'
}

export namespace BodyPartCategory {
  export const schema: JSONSchema<BodyPartCategory> = {
    type: 'string',
    enum: Object.values(BodyPartCategory)
  }

  export const validate: ValidateFunction<BodyPartCategory> = generateLazyValidator(schema)
}
