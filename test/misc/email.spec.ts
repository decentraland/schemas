import { expect } from 'expect'
import { emailSchema } from '../../src'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateEmail = generateLazyValidator(emailSchema)

describe('Email tests', () => {
  it('Email static tests must pass', () => {
    expect(validateEmail('valid@email.com')).toBeTruthy()
    expect(validateEmail('invalid@')).toBeFalsy()
    expect(validateEmail('@as.com')).toBeFalsy()
    expect(validateEmail(null)).toBeFalsy()
    expect(validateEmail({})).toBeFalsy()
  })
})
