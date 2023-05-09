import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export enum Locale {
  EN = 'en',
  ES = 'es'
}

/** @alpha */
export namespace Locale {
  export const schema: JSONSchema<Locale> = {
    type: 'string',
    enum: Object.values(Locale)
  }

  export const validate: ValidateFunction<Locale> = generateLazyValidator(schema)
}
