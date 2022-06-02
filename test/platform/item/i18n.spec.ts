import expect from 'expect'
import { I18N, Locale } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('I18N tests', () => {
  const i18n: I18N = {
    code: Locale.ES,
    text: 'some text'
  }

  testTypeSignature(I18N, i18n)

  it('static tests must pass', () => {
    expect(I18N.validate(i18n)).toEqual(true)
    expect(I18N.validate(null)).toEqual(false)
    expect(I18N.validate({})).toEqual(false)
  })
})
