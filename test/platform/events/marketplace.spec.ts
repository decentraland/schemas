import expect from 'expect'
import { BidReceivedEvent, Events } from '../../../src'

describe('Marketplace Events tests', () => {
  it('BidReceivedEvent static tests must pass', () => {
    const event: BidReceivedEvent = {
      type: Events.Type.MARKETPLACE,
      subType: Events.SubType.Marketplace.BID_RECEIVED,
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

    expect(BidReceivedEvent.validate(event)).toEqual(true)
    expect(BidReceivedEvent.validate(null)).toEqual(false)
    expect(BidReceivedEvent.validate({})).toEqual(false)
  })
})
