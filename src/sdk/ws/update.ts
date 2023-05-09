import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @public @deprecated */
export const UPDATE = 'update'

/** @public @deprecated */
export type Update = {
  type: typeof UPDATE
}

/** @public @deprecated */
export namespace Update {
  export const schema: JSONSchema<Update> = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: [UPDATE]
      }
    },
    required: ['type']
  }

  export const validate: ValidateFunction<Update> = generateLazyValidator(schema)
}
