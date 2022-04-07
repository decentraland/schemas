import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @alpha */
export enum PreviewEnv {
  PROD = 'prod',
  DEV = 'dev'
}

/** @alpha */
export namespace PreviewEnv {
  export const schema: JSONSchema<PreviewEnv> = {
    type: 'string',
    enum: Object.values(PreviewEnv)
  }

  export const validate: ValidateFunction<PreviewEnv> =
    generateValidator(schema)
}
