import type { JSONSchema } from '../../validation/types.js'

export enum PreviewCamera {
  STATIC = 'static',
  INTERACTIVE = 'interactive'
}

/** @alpha */
export const previewCameraSchema: JSONSchema<PreviewCamera> = {
  type: 'string',
  enum: Object.values(PreviewCamera)
}
