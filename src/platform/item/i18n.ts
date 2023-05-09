import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { Locale } from './locale'

/** @alpha */
export type I18N = {
  code: Locale
  text: string
}

/** @alpha */
export namespace I18N {
  export const schema: JSONSchema<I18N> = {
    type: 'object',
    properties: {
      code: Locale.schema,
      text: {
        type: 'string'
      }
    },
    additionalProperties: true,
    required: ['code', 'text']
  }

  export const validate: ValidateFunction<I18N> = generateLazyValidator(schema)
}
