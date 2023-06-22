import expect from 'expect'
import { Profile } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { AVATAR } from './avatar.spec'
import { Country } from '../../../src/platform/profile/additional-info/country'
import { EmploymentStatus } from '../../../src/platform/profile/additional-info/employment'
import { Gender } from '../../../src/platform/profile/additional-info/gender'
import { RelationshipStatus } from '../../../src/platform/profile/additional-info/relationship'
import { SexualOrientation } from '../../../src/platform/profile/additional-info/sexual-orientation'
import { Language } from '../../../src/platform/profile/additional-info/language'

describe('Profile tests', () => {
  const profile = {
    avatars: [AVATAR],
    country: Country.ARGENTINA,
    employment_status: EmploymentStatus.CHILLING,
    gender: Gender.FEMALE,
    relationship_status: RelationshipStatus.COMPLICATED,
    sexual_orientation: SexualOrientation.ASEXUAL,
    language: Language.ENGLISH,
    profession: 'Ninja Software Engineer',
    birthdate: '1990-01-01',
    real_name: 'Tini',
    hobbies: 'sing, dance, code, play, eat, sleep, repeat'
  }

  testTypeSignature(Profile, profile)

  it('static tests must pass', () => {
    expect(Profile.validate(profile)).toEqual(true)
    expect(Profile.validate(null)).toEqual(false)
    expect(Profile.validate({})).toEqual(false)
  })

  it('static tests must return the correct error when missing name', () => {
    const validate = Profile.validate
    expect(validate({})).toEqual(false)
    expect(validate.errors).toHaveLength(1)
    expect(validate.errors![0].message).toEqual("must have required property 'avatars'")
  })
})
