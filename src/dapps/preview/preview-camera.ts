import {
  JSONSchema,
  generateValidator,
  ValidateFunction
} from '../../validation'

export enum PreviewCamera {
  STATIC = 'static',
  INTERACTIVE = 'interactive'
}

/** @alpha */
export namespace PreviewCamera {
  export const schema: JSONSchema<PreviewCamera> = {
    type: 'string',
    enum: Object.values(PreviewCamera)
  }

  export const validate: ValidateFunction<PreviewCamera> =
    generateValidator(schema)
}
