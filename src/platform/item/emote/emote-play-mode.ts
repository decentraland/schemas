import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum EmotePlayMode {
  SIMPLE = 'simple',
  LOOP = 'loop'
}

export namespace EmotePlayMode {
  export const schema: JSONSchema<EmotePlayMode> = {
    type: 'string',
    enum: Object.values(EmotePlayMode)
  }

  export const validate: ValidateFunction<EmotePlayMode> = generateLazyValidator(schema)
}
