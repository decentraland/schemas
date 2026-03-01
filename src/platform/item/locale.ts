import type { JSONSchema } from '../../validation/types.js'

/** @alpha */
export enum Locale {
  EN = 'en',
  ES = 'es'
}

/** @alpha */
export const localeSchema: JSONSchema<Locale> = {
  type: 'string',
  enum: Object.values(Locale)
}
