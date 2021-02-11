import { JSONSchemaType } from "ajv"
import Ajv, { ValidateFunction } from "ajv"

export { ValidateFunction }

/**
 * Alias of AJV's JSONSchemaType to prevent imports to AJV directly.
 * @public
 */
export type Schema<T> = JSONSchemaType<T>

/**
 * Common structure to use types as values in TS.
 * @public
 */
export type AbstractTypedSchema<T> = {
  schema: Schema<T>
  validate: ValidateFunction<T>
}

/**
 * Generates a validator for a specific JSON schema of a type T
 * @public
 */
export function generateValidator<T>(schema: Schema<T>): ValidateFunction<T> {
  const ajv = new Ajv()
  return ajv.compile<T>(schema)
}

/**
 * Validates a type with a schema in a functional way.
 * @public
 */
export function validateType<T>(theType: Pick<AbstractTypedSchema<T>, "validate">, value: T) {
  return theType.validate(value)
}
