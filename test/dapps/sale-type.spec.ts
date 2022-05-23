import expect from 'expect'
import { SaleType } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('SaleType tests', () => {
  const saleType: SaleType = SaleType.MINT

  testTypeSignature(SaleType, saleType)

  it('static tests must pass', () => {
    expect(SaleType.validate(saleType)).toEqual(true)
    expect(SaleType.validate(null)).toEqual(false)
    expect(SaleType.validate({})).toEqual(false)
  })
})
