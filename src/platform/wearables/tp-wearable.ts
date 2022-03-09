import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { BaseWearable } from './base-wearable'

/** @alpha */
export type TPWearable = BaseWearable

/** @alpha */
export namespace TPWearable {
  export const schema: JSONSchema<TPWearable> = {
    ...BaseWearable.schema
  }

  const schemaValidator: ValidateFunction<TPWearable> =
    generateValidator(schema)
  export const validate: ValidateFunction<TPWearable> = (
    wearable: any
  ): wearable is TPWearable =>
    schemaValidator(wearable) &&
    BaseWearable.validateDuplicatedLocales(wearable.descriptions) &&
    BaseWearable.validateDuplicatedLocales(wearable.names)
}
