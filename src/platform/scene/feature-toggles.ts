import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @alpha */
export type FeatureToggles = Record<string, 'enabled' | 'disabled'>

/** @alpha */
export namespace FeatureToggles {
  export const schema: JSONSchema<FeatureToggles> = {
    type: 'object',
    required: []
  }

  export const validate: ValidateFunction<FeatureToggles> =
    generateValidator(schema)
}
