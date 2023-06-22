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
  employment_status?: EmploymentStatus
  gender?: Gender
  pronouns?: Pronouns
  relationship_status?: RelationshipStatus
  sexual_orientation?: SexualOrientation
  language?: Language
  profession?: string
  birthdate?: string
  real_name?: string
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
      country: Country.schema,
      employment_status: EmploymentStatus.schema,
      gender: Gender.schema,
      pronouns: Pronouns.schema,
      relationship_status: RelationshipStatus.schema,
      sexual_orientation: SexualOrientation.schema,
      language: Language.schema,
      profession: {
        nullable: true,
        type: 'string'
      },
      birthdate: {
        nullable: true,
        type: 'string'
      },
      real_name: {
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
