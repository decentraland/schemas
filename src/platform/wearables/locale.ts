import { generateValidator, JSONSchema, ValidateFunction } from '../../validation'

export enum Locale {
  EN = 'en',
  ES = 'es'
}

export namespace Locale {
  export const schema: JSONSchema<Locale> = {
    type: 'string',
    enum: Object.values(Locale),
  }

  export const validate: ValidateFunction<Locale> = generateValidator(schema)
}
