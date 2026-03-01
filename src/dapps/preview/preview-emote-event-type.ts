import type { JSONSchema } from '../../validation/types.js'

export enum PreviewEmoteEventType {
  ANIMATION_PLAY = 'animation_play',
  ANIMATION_PAUSE = 'animation_pause',
  ANIMATION_LOOP = 'animation_loop',
  ANIMATION_END = 'animation_end',
  ANIMATION_PLAYING = 'animation_playing'
}

/** @alpha */
export const previewEmoteEventTypeSchema: JSONSchema<PreviewEmoteEventType> = {
  type: 'string',
  enum: Object.values(PreviewEmoteEventType)
}
