import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { Avatar } from './avatar'

const MAX_AVATARS = 1

/**
 * Profile containing one or multiple avatars
 * @alpha
 */
export type Profile = {
  avatars: Avatar[]
}

/**
 * Profile
 * @alpha
 */
export namespace Profile {
  export const schema: JSONSchema<Profile> = {
    type: 'object',
    required: ['avatars'],
    properties: {
      avatars: {
        type: 'array',
        // Deployed profiles carry exactly one avatar; consumers only ever read `avatars[0]`.
        maxItems: MAX_AVATARS,
        items: Avatar.schema
      }
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Profile> = generateLazyValidator(schema)
}
