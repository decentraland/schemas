import { expect } from 'expect'
import { type Account, accountSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateAccount = generateLazyValidator(accountSchema)

describe('Account tests', () => {
  const account: Account = {
    id: '0x2041694201525630780780247644590609268611',
    address: '0x2041694201525630780780247644590609268611',
    sales: 10,
    purchases: 10,
    spent: '1000000000000000000',
    earned: '1000000000000000000',
    royalties: '1000000000000000000',
    collections: 1
  }

  testTypeSignature({ schema: accountSchema }, account)

  it('static tests must pass', () => {
    expect(validateAccount(account)).toEqual(true)
    expect(validateAccount(null)).toEqual(false)
    expect(validateAccount({})).toEqual(false)
  })
})
