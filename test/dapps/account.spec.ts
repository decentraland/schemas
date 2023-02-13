import expect from 'expect'
import { Account } from '../../src'
import { testTypeSignature } from '../test-utils'

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

  testTypeSignature(Account, account)

  it('static tests must pass', () => {
    expect(Account.validate(account)).toEqual(true)
    expect(Account.validate(null)).toEqual(false)
    expect(Account.validate({})).toEqual(false)
  })
})
