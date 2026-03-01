import type { JSONSchema } from '../../validation/types.js'

export enum PreviewProjection {
  ORTHOGRAPHIC = 'orthographic',
  PERSPECTIVE = 'perspective'
}

export const previewProjectionSchema: JSONSchema<PreviewProjection> = {
  type: 'string',
  enum: Object.values(PreviewProjection)
}
