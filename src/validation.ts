import { JSONSchemaType } from "ajv"
import Ajv, { ValidateFunction } from "ajv"

export type Schema<T> = JSONSchemaType<T>

export function generateValidator<T>(schema: Schema<T>): ValidateFunction<T> {
  const ajv = new Ajv()
  return ajv.compile<T>(schema)
}
