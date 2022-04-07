import expect from 'expect'
import { NFTCategory } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('NFTCategory tests', () => {
  const nftCategory: NFTCategory = NFTCategory.PARCEL

  testTypeSignature(NFTCategory, nftCategory)

  it('static tests must pass', () => {
    expect(NFTCategory.validate(nftCategory)).toEqual(true)
    expect(NFTCategory.validate(null)).toEqual(false)
    expect(NFTCategory.validate({})).toEqual(false)
  })
})
