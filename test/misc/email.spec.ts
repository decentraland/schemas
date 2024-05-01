import expect from 'expect'
import { Email } from '../../src'

describe('Email tests', () => {
  it('Email static tests must pass', () => {
    expect(Email.validate('valid@email.com')).toBeTruthy()
    expect(Email.validate('invalid@')).toBeFalsy()
    expect(Email.validate('@as.com')).toBeFalsy()
    expect(Email.validate(null)).toBeFalsy()
    expect(Email.validate({})).toBeFalsy()
  })
})
