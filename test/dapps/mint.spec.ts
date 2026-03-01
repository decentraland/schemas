import { expect } from 'expect'
import { ChainId, type Mint, mintSchema, Network } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateMint = generateLazyValidator(mintSchema)

describe('Mint tests', () => {
  describe('mint', () => {
    const mint: Mint = {
      id: '0x66194b1abcbfbedd83841775404b245c8f9e4183-210624583337114373395836055367340864637790190801098222508622012858',
      creator: '0x4ac6144e29bdad84e7671027da80422bb00787ce',
      beneficiary: '0x2fb37b72208f043ed5bdf76d443cdc5c5c204005',
      minter: '0x214ffc0f0103735728dc66b61a22e4f163e275ae',
      itemId: '2',
      tokenId: '210624583337114373395836055367340864637790190801098222508622012858',
      issuedId: '57786',
      contractAddress: '0x66194b1abcbfbedd83841775404b245c8f9e4183',
      price: '0',
      timestamp: 1636057380000,
      network: Network.MATIC,
      chainId: ChainId.MATIC_MAINNET
    }

    testTypeSignature({ schema: mintSchema }, mint)

    it('static tests must pass', () => {
      expect(validateMint(mint)).toEqual(true)
      expect(validateMint(null)).toEqual(false)
      expect(validateMint({})).toEqual(false)
    })
  })
})
