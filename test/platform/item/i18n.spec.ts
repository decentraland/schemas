import { expect } from 'expect'
import type { I18N } from '../../../src'
import { i18nSchema, Locale } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateI18N = generateLazyValidator(i18nSchema)

describe('I18N tests', () => {
  const i18n: I18N = {
    code: Locale.ES,
    text: 'some text'
  }

  testTypeSignature({ schema: i18nSchema }, i18n)

  it('static tests must pass', () => {
    expect(validateI18N(i18n)).toEqual(true)
    expect(validateI18N(null)).toEqual(false)
    expect(validateI18N({})).toEqual(false)
  })
})
