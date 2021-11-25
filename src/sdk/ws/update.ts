import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @internal @deprecated */
export const UPDATE = 'update'

/** @internal @deprecated */
export type Update = {
  type: typeof UPDATE
}

/** @internal @deprecated */
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

  export const validate: ValidateFunction<Update> = generateValidator(schema)
}
