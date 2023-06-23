import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { Country } from './additional-info/country'
import { EmploymentStatus } from './additional-info/employment'
import { Gender } from './additional-info/gender'
import { Language } from './additional-info/language'
import { Pronouns } from './additional-info/pronouns'
import { RelationshipStatus } from './additional-info/relationship'
import { SexualOrientation } from './additional-info/sexual-orientation'
import { Avatar } from './avatar'

/**
 * Profile containing one or multiple avatars
 * @alpha
 */
export type Profile = {
  avatars: Avatar[]
  country?: string
  employmentStatus?: string
  gender?: string
  pronouns?: string
  relationshipStatus?: string
  sexualOrientation?: string
  language?: string
  profession?: string
  birthdate?: string
  realName?: string
  hobbies?: string
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
      },
      country: {
        nullable: true,
        type: 'string'
      },
      employmentStatus: {
        nullable: true,
        type: 'string'
      },
      gender: {
        nullable: true,
        type: 'string'
      },
      pronouns: {
        nullable: true,
        type: 'string'
      },
      relationshipStatus: {
        nullable: true,
        type: 'string'
      },
      sexualOrientation: {
        nullable: true,
        type: 'string'
      },
      language: {
        nullable: true,
        type: 'string'
      },
      profession: {
        nullable: true,
        type: 'string'
      },
      birthdate: {
        nullable: true,
        type: 'string'
      },
      realName: {
        nullable: true,
        type: 'string'
      },
      hobbies: {
        nullable: true,
        type: 'string'
      }
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Profile> = generateLazyValidator(schema)
}
