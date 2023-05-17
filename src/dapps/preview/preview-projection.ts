import { JSONSchema, generateLazyValidator, ValidateFunction } from '../../validation'

export enum PreviewProjection {
  ORTHOGRAPHIC = 'orthographic',
  PERSPECTIVE = 'perspective'
}

export namespace PreviewProjection {
  export const schema: JSONSchema<PreviewProjection> = {
    type: 'string',
    enum: Object.values(PreviewProjection)
  }

  export const validate: ValidateFunction<PreviewProjection> = generateLazyValidator(schema)
}
