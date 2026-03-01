import type { JSONSchema } from '../validation/types.js'

/**
 * Email is a data type that describes an email address
 * @public
 */
export type Email = string

/**
 * Email
 * @public
 */
export const emailSchema: JSONSchema<Email> = {
  type: 'string',
  pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$'
}
