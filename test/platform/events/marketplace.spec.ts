import expect from 'expect'
import { BidReceivedEvent, Events, ItemDiscountedEvent } from '../../../src'

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

  it('ItemDiscountedEvent static tests must pass', () => {
    const event: ItemDiscountedEvent = {
      type: Events.Type.MARKETPLACE,
      subType: Events.SubType.Marketplace.ITEM_DISCOUNTED,
      key: 'item-discounted-coupon-0xabc-1-0xdef',
      timestamp: 1,
      metadata: {
        address: '0xdef',
        image: 'image',
        category: 'wearable',
        rarity: 'epic',
        nftName: 'Pumpkin Hat',
        contractAddress: '0xabc',
        itemId: '1',
        link: 'https://decentraland.org/shop/item/0xabc/1',
        discountPct: 30,
        listPrice: '100',
        salePrice: '70',
        endsAt: 1700000000000,
        title: 'Favorite on sale',
        description: 'Pumpkin Hat is 30% off',
        network: 'MATIC'
      }
    }

    expect(ItemDiscountedEvent.validate(event)).toEqual(true)
    const withMetadata = (metadata: Record<string, unknown>) => ({
      ...event,
      metadata: { ...event.metadata, ...metadata }
    })
    expect(ItemDiscountedEvent.validate(withMetadata({ rarity: undefined, nftName: undefined }))).toEqual(true)
    expect(ItemDiscountedEvent.validate(withMetadata({ discountPct: 0 }))).toEqual(false)
    expect(ItemDiscountedEvent.validate(withMetadata({ discountPct: 101 }))).toEqual(false)
    expect(ItemDiscountedEvent.validate(withMetadata({ discountPct: 30.5 }))).toEqual(false)
    expect(ItemDiscountedEvent.validate(withMetadata({ salePrice: '7.5' }))).toEqual(false)
    expect(ItemDiscountedEvent.validate(withMetadata({ endsAt: undefined }))).toEqual(false)
    expect(ItemDiscountedEvent.validate({ ...event, subType: Events.SubType.Marketplace.BID_RECEIVED })).toEqual(false)
    expect(ItemDiscountedEvent.validate({ ...event, extra: true })).toEqual(false)
    expect(ItemDiscountedEvent.validate(null)).toEqual(false)
    expect(ItemDiscountedEvent.validate({})).toEqual(false)
  })
})
