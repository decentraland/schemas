import expect from 'expect'
import {
  BodyShape,
  ChainId,
  Item,
  Network,
  NFTCategory,
  Rarity,
  WearableCategory
} from '../src'
import { ItemType } from '../src/dapps/item-type'
import { testTypeSignature } from './test-utils'

describe('Item tests', () => {
  describe('wearable', () => {
    const wearable: Item = {
      id: '0x0699189ac32c8e404d900786317c93c23fe6f209-0',
      name: 'Moon Boys Helmet',
      type: ItemType.WEARABLE,
      thumbnail:
        'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0x0699189ac32c8e404d900786317c93c23fe6f209:0/thumbnail',
      url: '/contracts/0x0699189ac32c8e404d900786317c93c23fe6f209/items/0',
      category: NFTCategory.WEARABLE,
      contractAddress: '0x0699189ac32c8e404d900786317c93c23fe6f209',
      itemId: '0',
      rarity: Rarity.MYTHIC,
      price: '808000000000000000000',
      available: 0,
      isOnSale: false,
      creator: '0xfe705ead02e849e78278c50de3d939be23448f1a',
      data: {
        wearable: {
          description: 'Wearable by DaddyChang',
          category: WearableCategory.HELMET,
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
          rarity: Rarity.MYTHIC
        }
      },
      network: Network.MATIC,
      chainId: ChainId.MATIC_MAINNET,
      createdAt: 1625731369000,
      updatedAt: 1626088534000,
      reviewedAt: 1626088534000,
      soldAt: 1626088534000
    }

    testTypeSignature(Item, wearable)

    it('static tests must pass', () => {
      expect(Item.validate(wearable)).toEqual(true)
      expect(Item.validate(null)).toEqual(false)
      expect(Item.validate({})).toEqual(false)
    })
  })
})
