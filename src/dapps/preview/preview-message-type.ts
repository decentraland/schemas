import {
  JSONSchema,
  generateValidator,
  ValidateFunction
} from '../../validation'

export enum PreviewMessageType {
  LOAD = 'load',
  ERROR = 'error',
  UPDATE = 'update'
}

/** @alpha */
export namespace PreviewMessageType {
  export const schema: JSONSchema<PreviewMessageType> = {
    type: 'string',
    enum: Object.values(PreviewMessageType)
  }

  export const validate: ValidateFunction<PreviewMessageType> =
    generateValidator(schema)
}
