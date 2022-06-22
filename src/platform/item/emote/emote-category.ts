import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../validation'

export enum EmoteCategory {
  SIMPLE = 'simple'
}

export namespace EmoteCategory {
  export const schema: JSONSchema<EmoteCategory> = {
    type: 'string',
    enum: Object.values(EmoteCategory)
  }

  export const validate: ValidateFunction<EmoteCategory> =
    generateValidator(schema)
}
