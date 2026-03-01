import type { JSONSchema } from '../../validation/types.js'
import { Locale, localeSchema } from './locale.js'

/** @alpha */
export type I18N = {
  code: Locale
  text: string
}

/** @alpha */
export const i18nSchema: JSONSchema<I18N> = {
  type: 'object',
  properties: {
    code: localeSchema,
    text: {
      type: 'string'
    }
  },
  additionalProperties: true,
  required: ['code', 'text']
}
