import expect from 'expect'
import { MetaTransaction } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('MetaTransaction tests', () => {
  const metaTx: MetaTransaction = {
    from: '0x1',
    params: ['0x2', '0x3']
  }

  testTypeSignature(MetaTransaction, metaTx)

  it('static tests must pass', () => {
    expect(MetaTransaction.validate(metaTx)).toEqual(true)
    expect(MetaTransaction.validate(null)).toEqual(false)
    expect(MetaTransaction.validate({})).toEqual(false)
  })
})
