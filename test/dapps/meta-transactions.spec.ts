import { expect } from 'expect'
import { type MetaTransaction, metaTransactionSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateMetaTransaction = generateLazyValidator(metaTransactionSchema)

describe('MetaTransaction tests', () => {
  const metaTx: MetaTransaction = {
    from: '0x1',
    params: ['0x2', '0x3']
  }

  testTypeSignature({ schema: metaTransactionSchema }, metaTx)

  it('static tests must pass', () => {
    expect(validateMetaTransaction(metaTx)).toEqual(true)
    expect(validateMetaTransaction(null)).toEqual(false)
    expect(validateMetaTransaction({})).toEqual(false)
  })
})
