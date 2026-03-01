import type { JSONSchema } from '../../../validation/types.js'

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

export const emoteCategorySchema: JSONSchema<EmoteCategory> = {
  type: 'string',
  enum: Object.values(EmoteCategory)
}
