import type { JSONSchema } from '../../../validation/types.js'

export enum EmotePlayMode {
  SIMPLE = 'simple',
  LOOP = 'loop'
}

export const emotePlayModeSchema: JSONSchema<EmotePlayMode> = {
  type: 'string',
  enum: Object.values(EmotePlayMode)
}
