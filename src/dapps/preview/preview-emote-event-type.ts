import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

export enum PreviewEmoteEventType {
  ANIMATION_PLAY = 'animation_play',
  ANIMATION_PAUSE = 'animation_pause',
  ANIMATION_LOOP = 'animation_loop',
  ANIMATION_END = 'animation_end',
  ANIMATION_PLAYING = 'animation_playing'
}

/** @alpha */
export namespace PreviewEmoteEventType {
  export const schema: JSONSchema<PreviewEmoteEventType> = {
    type: 'string',
    enum: Object.values(PreviewEmoteEventType)
  }

  export const validate: ValidateFunction<PreviewEmoteEventType> = generateLazyValidator(schema)
}
