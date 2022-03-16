import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { Avatar } from './avatar'

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
        items: Avatar.schema
      }
    },
    additionalProperties: true
  }
  const schemaValidator: ValidateFunction<Profile> = generateValidator(schema)
  export const validate: ValidateFunction<Profile> = (
    profile: any
  ): profile is Profile => schemaValidator(profile)
}
