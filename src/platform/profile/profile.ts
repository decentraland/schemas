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
  country?: Country
  employmentStatus?: EmploymentStatus
  gender?: Gender
  pronouns?: Pronouns
  relationshipStatus?: RelationshipStatus
  sexualOrientation?: SexualOrientation
  language?: Language
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
        ...Country.schema,
        nullable: true
      },
      employmentStatus: {
        ...EmploymentStatus.schema,
        nullable: true
      },
      gender: {
        ...Gender.schema,
        nullable: true
      },
      pronouns: {
        ...Pronouns.schema,
        nullable: true
      },
      relationshipStatus: {
        ...RelationshipStatus.schema,
        nullable: true
      },
      sexualOrientation: {
        ...SexualOrientation.schema,
        nullable: true
      },
      language: {
        ...Language.schema,
        nullable: true
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
