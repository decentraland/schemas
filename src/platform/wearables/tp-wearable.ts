import { JSONSchema, ValidateFunction } from '../../validation'
import { BaseWearable } from './base-wearable'

/** @alpha */
export type TPWearable = BaseWearable

/** @alpha */
export namespace TPWearable {
  export const schema: JSONSchema<TPWearable> = BaseWearable.schema
  export const validate: ValidateFunction<TPWearable> = BaseWearable.validate
}
