import { expect } from 'expect'
import { profileSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { AVATAR } from './avatar.spec'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateProfile = generateLazyValidator(profileSchema)

describe('Profile tests', () => {
  const profile = {
    avatars: [AVATAR]
  }

  testTypeSignature({ schema: profileSchema }, profile)

  it('static tests must pass', () => {
    expect(validateProfile(profile)).toEqual(true)
    expect(validateProfile(null)).toEqual(false)
    expect(validateProfile({})).toEqual(false)
  })

  it('static tests must return the correct error when missing name', () => {
    const validate = validateProfile
    expect(validate({})).toEqual(false)
    expect(validate.errors).toHaveLength(1)
    expect(validate.errors![0].message).toEqual("must have required property 'avatars'")
  })
})
