import { JSONSchema, ValidateFunction } from '../validation'

/**
/**
 * Email is a data type that describes an email address
 * @public
 */
export type Email = string

/**
 * Email
 * @public
 */
export namespace Email {
  export const schema: JSONSchema<Email> = {
    type: 'string',
    pattern: '^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$'
  }
  const regexp = new RegExp(schema.pattern!)

  export const validate: ValidateFunction<Email> = (email: any): email is Email => regexp.test(email)
}
