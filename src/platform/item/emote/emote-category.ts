import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum EmoteCategory {
  DANCE = 'dance',
  STUNT = 'stunt',
  GREETINGS = 'greetings',
  FUN = 'fun',
  POSES = 'poses',
  REACTIONS = 'reactions',
  HORROR = 'horror',
  MISCELLANEOUS = 'miscellaneous'
}

export namespace EmoteCategory {
  export const schema: JSONSchema<EmoteCategory> = {
    type: 'string',
    enum: Object.values(EmoteCategory)
  }

  export const validate: ValidateFunction<EmoteCategory> = generateLazyValidator(schema)
}
