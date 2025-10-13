import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum EmoteOutcomeType {
  SIMPLE_OUTCOME = 'so',
  MULTIPLE_OUTCOME = 'mo',
  RANDOM_OUTCOME = 'ro'
}

export namespace EmoteOutcomeType {
  export const schema: JSONSchema<EmoteOutcomeType> = {
    type: 'string',
    enum: Object.values(EmoteOutcomeType)
  }

  export const validate: ValidateFunction<EmoteOutcomeType> = generateLazyValidator(schema)
}
