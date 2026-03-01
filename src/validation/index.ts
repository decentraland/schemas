import Ajv from 'ajv'
import type { KeywordDefinition as AjvKeywordDefinition } from 'ajv'
import ajvKeywords from 'ajv-keywords'
import ajvErrors from 'ajv-errors'
import type { JSONSchema, ValidateFunction, KeywordDefinition, AbstractTypedSchema } from './types.js'

export type { ValidateFunction, JSONSchema, AbstractTypedSchema, KeywordDefinition, ValidationError } from './types.js'

/**
 * Generates a validator for a specific JSON schema of a type T
 * @public
 */
export function generateLazyValidator<T>(
  schema: JSONSchema<T>,
  keywordDefinitions?: KeywordDefinition[]
): ValidateFunction<T> {
  let validateFn: ValidateFunction<T> | null = null
  const theReturnedValidateFunction = (data: any, dataCxt?: any): data is T => {
    if (!validateFn) {
      const ajv = new Ajv({ $data: true, allErrors: true })
      ajvKeywords(ajv)
      ajvErrors(ajv, { singleError: true })
      keywordDefinitions?.forEach((kw) => ajv.addKeyword(kw as AjvKeywordDefinition))
      validateFn = ajv.compile<T>(schema)
      Object.defineProperty(theReturnedValidateFunction, 'errors', {
        get() {
          return validateFn?.errors
        }
      })
    }
    return validateFn(data, dataCxt)
  }
  return theReturnedValidateFunction
}

/**
 * Validates a type with a schema in a functional way.
 * @public
 */
export function validateType<T>(theType: Pick<AbstractTypedSchema<T>, 'validate'>, value: T) {
  return theType.validate(value)
}
