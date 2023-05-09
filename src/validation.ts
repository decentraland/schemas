import Ajv, { ErrorObject, JSONSchemaType, KeywordDefinition } from 'ajv'
import ajv_keywords from 'ajv-keywords'
import ajv_errors from 'ajv-errors'

export { Ajv }

/**
 * This type is a subset of AJV's ValidateFunction, it exists to make
 * .d.ts bundles smaller and to not expose all of AJV context to the
 * world.
 * @public
 */
export interface ValidateFunction<T = unknown> {
  (this: any, data: any, dataCxt?: any): data is T
  errors?: null | ErrorObject[]
}

/**
 * This type alias exist only to avoid accidental refactors involving names of ajv
 * @public
 */
export type JSONSchema<T> = JSONSchemaType<T>

/**
 * Common structure to use types as values in TS.
 * @public
 */
export type AbstractTypedSchema<T> = {
  schema: JSONSchema<T>
  validate: ValidateFunction<T>
}

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
      ajv_keywords(ajv)
      ajv_errors(ajv, { singleError: true })
      keywordDefinitions?.forEach((kw: string | KeywordDefinition) => ajv.addKeyword(kw))
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
