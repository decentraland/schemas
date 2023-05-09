import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export enum PreviewType {
  TEXTURE = 'texture',
  WEARABLE = 'wearable',
  AVATAR = 'avatar'
}

/** @alpha */
export namespace PreviewType {
  export const schema: JSONSchema<PreviewType> = {
    type: 'string',
    enum: Object.values(PreviewType)
  }

  export const validate: ValidateFunction<PreviewType> = generateLazyValidator(schema)
}
