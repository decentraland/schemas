import expect from 'expect'
import { ChainId, Sale, Network, SaleType } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Sale tests', () => {
  describe('sale', () => {
    const sale: Sale = {
      id: 'sale-matic-137113',
      type: SaleType.MINT,
      buyer: '0x2fb37b72208f043ed5bdf76d443cdc5c5c204005',
      seller: '0x4ac6144e29bdad84e7671027da80422bb00787ce',
      itemId: '2',
      tokenId: '210624583337114373395836055367340864637790190801098222508622012858',
      contractAddress: '0x66194b1abcbfbedd83841775404b245c8f9e4183',
      price: '0',
      timestamp: 1636057380000,
      txHash: '0x2bfc1458d1ec631bfcd9782e001d93fe0cf95a6e4fede3222e9e5bde7fb47e36',
      network: Network.MATIC,
      chainId: ChainId.MATIC_MAINNET
    }

    testTypeSignature(Sale, sale)

    it('static tests must pass', () => {
      expect(Sale.validate(sale)).toEqual(true)
      expect(Sale.validate(null)).toEqual(false)
      expect(Sale.validate({})).toEqual(false)
    })
  })
})
