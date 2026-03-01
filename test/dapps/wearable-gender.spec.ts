import { expect } from 'expect'
import { WearableGender, wearableGenderSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateWearableGender = generateLazyValidator(wearableGenderSchema)

describe('WearableGender tests', () => {
  const wearableGender: WearableGender = WearableGender.MALE

  testTypeSignature({ schema: wearableGenderSchema }, wearableGender)

  it('static tests must pass', () => {
    expect(validateWearableGender(wearableGender)).toEqual(true)
    expect(validateWearableGender(null)).toEqual(false)
    expect(validateWearableGender({})).toEqual(false)
  })
})
