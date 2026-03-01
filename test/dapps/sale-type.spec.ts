import { expect } from 'expect'
import { SaleType, saleTypeSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateSaleType = generateLazyValidator(saleTypeSchema)

describe('SaleType tests', () => {
  const saleType: SaleType = SaleType.MINT

  testTypeSignature({ schema: saleTypeSchema }, saleType)

  it('static tests must pass', () => {
    expect(validateSaleType(saleType)).toEqual(true)
    expect(validateSaleType(null)).toEqual(false)
    expect(validateSaleType({})).toEqual(false)
  })
})
