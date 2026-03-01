import { expect } from 'expect'
import { ChainId, type Collection, collectionSchema, Network } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateCollection = generateLazyValidator(collectionSchema)

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

    testTypeSignature({ schema: collectionSchema }, collection)

    it('static tests must pass', () => {
      expect(validateCollection(collection)).toEqual(true)
      expect(validateCollection(null)).toEqual(false)
      expect(validateCollection({})).toEqual(false)
    })
  })
})
