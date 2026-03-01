import { expect } from 'expect'
import { Locale, localeSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateLocale = generateLazyValidator(localeSchema)

describe('Locale tests', () => {
  const locale: Locale = Locale.EN

  testTypeSignature({ schema: localeSchema }, locale)

  it('static tests must pass', () => {
    expect(validateLocale(locale)).toEqual(true)
    expect(validateLocale(null)).toEqual(false)
    expect(validateLocale({})).toEqual(false)
  })
})
