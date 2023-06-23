import expect from 'expect'
import { Profile } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { AVATAR } from './avatar.spec'

describe('Profile tests', () => {
  const profile = {
    avatars: [AVATAR]
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
