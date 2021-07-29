import expect from 'expect'
import { Locale } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Locale tests', () => {
  const locale: Locale = Locale.EN

  testTypeSignature(Locale, locale)

  it('static tests must pass', () => {
    expect(Locale.validate(locale)).toEqual(true)
    expect(Locale.validate(null)).toEqual(false)
    expect(Locale.validate({})).toEqual(false)
  })
})
