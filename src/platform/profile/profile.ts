import type { JSONSchema } from '../../validation/types.js'
import { Avatar, avatarSchema } from './avatar.js'

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
export const profileSchema: JSONSchema<Profile> = {
  type: 'object',
  required: ['avatars'],
  properties: {
    avatars: {
      type: 'array',
      items: avatarSchema
    }
  },
  additionalProperties: true
}
