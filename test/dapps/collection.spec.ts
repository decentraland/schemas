import expect from 'expect'
import { ChainId, Collection, Network } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Collection tests', () => {
  describe('collection', () => {
    const collection: Collection = {
      urn: 'urn:decentraland:matic:collections-v2:0xdf9293c820d5ac290b97fa62b449a9c790014296',
      creator: '0x6adf75e49bac21abab9adb9266d2cc6d90abd31a',
      name: '10M Users MetaMask Celebration',
      contractAddress: '0xdf9293c820d5ac290b97fa62b449a9c790014296',
      createdAt: 1630556382000,
      updatedAt: 1630599344000,
      reviewedAt: 1630599344000,
      isOnSale: false,
      size: 1,
      network: Network.MATIC,
      chainId: ChainId.MATIC_MAINNET,
      firstListedAt: null
    }

    testTypeSignature(Collection, collection)

    it('static tests must pass', () => {
      expect(Collection.validate(collection)).toEqual(true)
      expect(Collection.validate(null)).toEqual(false)
      expect(Collection.validate({})).toEqual(false)
    })
  })
})
