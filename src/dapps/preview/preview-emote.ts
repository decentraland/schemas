import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

export enum PreviewEmote {
  IDLE = 'idle',
  WALK = 'walk',
  RUN = 'run',
  JUMP = 'jump',
  CLAP = 'clap',
  DAB = 'dab',
  DANCE = 'dance',
  FASHION = 'fashion',
  FASHION_2 = 'fashion-2',
  FASHION_3 = 'fashion-3',
  FASHION_4 = 'fashion-4',
  LOVE = 'love',
  MONEY = 'money',
  FIST_PUMP = 'fist-pump',
  HEAD_EXPLODE = 'head-explode',
  WAVE = 'wave'
}

/** @alpha */
export namespace PreviewEmote {
  export const schema: JSONSchema<PreviewEmote> = {
    type: 'string',
    enum: Object.values(PreviewEmote)
  }

  export const validate: ValidateFunction<PreviewEmote> = generateLazyValidator(schema)
}
