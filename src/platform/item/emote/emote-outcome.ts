import type { JSONSchema } from '../../../validation/types.js'

export enum EmoteOutcomeType {
  SIMPLE_OUTCOME = 'so',
  MULTIPLE_OUTCOME = 'mo',
  RANDOM_OUTCOME = 'ro'
}

export const emoteOutcomeTypeSchema: JSONSchema<EmoteOutcomeType> = {
  type: 'string',
  enum: Object.values(EmoteOutcomeType)
}
