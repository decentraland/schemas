import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

export enum PreviewEmoteEventType {
  ANIMATION_PLAY = 'play',
  ANIMATION_PAUSE = 'pause',
  ANIMATION_LOOP = 'loop',
  ANIMATION_END = 'end'
}

/** @alpha */
export namespace PreviewEmoteEventType {
  export const schema: JSONSchema<PreviewEmoteEventType> = {
    type: 'string',
    enum: Object.values(PreviewEmoteEventType)
  }

  export const validate: ValidateFunction<PreviewEmoteEventType> =
    generateLazyValidator(schema)
}
