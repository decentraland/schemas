import { expect } from 'expect'
import {
  BidReceivedEvent,
  EventType,
  EventSubTypeMarketplace,
  bidReceivedEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateBidReceivedEvent = generateLazyValidator(bidReceivedEventSchema)

describe('Marketplace Events tests', () => {
  it('BidReceivedEvent static tests must pass', () => {
    const event: BidReceivedEvent = {
      type: EventType.MARKETPLACE,
      subType: EventSubTypeMarketplace.BID_RECEIVED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: 'address',
        image: 'image',
        seller: 'seller',
        category: 'category',
        rarity: 'rarity',
        link: 'link',
        nftName: 'nftName',
        price: '1',
        title: 'title',
        description: 'description',
        network: 'network'
      }
    }

    expect(validateBidReceivedEvent(event)).toEqual(true)
    expect(validateBidReceivedEvent(null)).toEqual(false)
    expect(validateBidReceivedEvent({})).toEqual(false)
  })
})
