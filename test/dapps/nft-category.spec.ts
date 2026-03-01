import { expect } from 'expect'
import { NFTCategory, nftCategorySchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateNFTCategory = generateLazyValidator(nftCategorySchema)

describe('NFTCategory tests', () => {
  const nftCategory: NFTCategory = NFTCategory.PARCEL

  testTypeSignature({ schema: nftCategorySchema }, nftCategory)

  it('static tests must pass', () => {
    expect(validateNFTCategory(nftCategory)).toEqual(true)
    expect(validateNFTCategory(null)).toEqual(false)
    expect(validateNFTCategory({})).toEqual(false)
  })
})
