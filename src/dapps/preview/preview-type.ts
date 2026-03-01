import type { JSONSchema } from '../../validation/types.js'

/** @alpha */
export enum PreviewType {
  TEXTURE = 'texture',
  WEARABLE = 'wearable',
  AVATAR = 'avatar'
}

/** @alpha */
export const previewTypeSchema: JSONSchema<PreviewType> = {
  type: 'string',
  enum: Object.values(PreviewType)
}
