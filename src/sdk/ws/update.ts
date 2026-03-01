import type { JSONSchema } from '../../validation/types.js'

/** @public @deprecated */
export const UPDATE = 'update'

/** @public @deprecated */
export type Update = {
  type: typeof UPDATE
}

/** @public @deprecated */
export const updateSchema: JSONSchema<Update> = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: [UPDATE]
    }
  },
  required: ['type']
}
