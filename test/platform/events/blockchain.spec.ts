import expect from 'expect'
import {
  BidAcceptedEvent,
  CollectionCreatedEvent,
  Events,
  ItemPublishedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent
} from '../../../src'

describe('Blockchain Events tests', () => {
  it('BidAcceptedEvent static tests must pass', () => {
    const event: BidAcceptedEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.BID_ACCEPTED,
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

    expect(BidAcceptedEvent.validate(event)).toEqual(true)
    expect(BidAcceptedEvent.validate(null)).toEqual(false)
    expect(BidAcceptedEvent.validate({})).toEqual(false)
  })

  it('ItemSold static tests must pass', () => {
    const event: ItemSoldEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.ITEM_SOLD,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: 'address',
        image: 'image',
        buyer: 'buyer',
        seller: 'seller',
        category: 'category',
        rarity: 'rarity',
        link: 'link',
        nftName: 'nftName',
        title: 'title',
        description: 'description',
        network: 'network',
        tokenId: 'tokenId'
      }
    }

    expect(ItemSoldEvent.validate(event)).toEqual(true)
    expect(ItemSoldEvent.validate(null)).toEqual(false)
    expect(ItemSoldEvent.validate({})).toEqual(false)
  })

  it('ItemPublished static tests must pass', () => {
    const event: ItemPublishedEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.ITEM_PUBLISHED,
      key: 'key',
      timestamp: 1,
      metadata: {
        creator: 'creator',
        category: 'category',
        rarity: 'rarity',
        network: 'network',
        itemId: 'itemId',
        urn: 'urn'
      }
    }

    expect(ItemPublishedEvent.validate(event)).toEqual(true)
    expect(ItemPublishedEvent.validate(null)).toEqual(false)
    expect(ItemPublishedEvent.validate({})).toEqual(false)
  })

  it('RentalEndedEvent static tests must pass', () => {
    const event: RentalEndedEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.RENTAL_ENDED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: 'address',
        contract: 'contract',
        land: 'land',
        lessor: 'lessor',
        tenant: 'tenant',
        operator: 'operator',
        startedAt: 'startedAt',
        endedAt: 'endedAt',
        tokenId: 'tokenId',
        link: 'link',
        title: 'title',
        description: 'description'
      }
    }

    expect(RentalEndedEvent.validate(event)).toEqual(true)
    expect(RentalEndedEvent.validate(null)).toEqual(false)
    expect(RentalEndedEvent.validate({})).toEqual(false)
  })

  it('RentalStartedEvent static tests must pass', () => {
    const event: RentalStartedEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.RENTAL_STARTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: 'address',
        contract: 'contract',
        land: 'land',
        lessor: 'lessor',
        tenant: 'tenant',
        operator: 'operator',
        startedAt: 'startedAt',
        endedAt: 'endedAt',
        tokenId: 'tokenId',
        link: 'link',
        title: 'title',
        description: 'description'
      }
    }

    expect(RentalStartedEvent.validate(event)).toEqual(true)
    expect(RentalStartedEvent.validate(null)).toEqual(false)
    expect(RentalStartedEvent.validate({})).toEqual(false)
  })

  it('RoyaltiesEarnedEvent static tests must pass', () => {
    const event: RoyaltiesEarnedEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.ROYALTIES_EARNED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: 'address',
        image: 'image',
        category: 'category',
        rarity: 'rarity',
        link: 'link',
        nftName: 'nftName',
        royaltiesCut: '1',
        royaltiesCollector: 'royaltiesCollector',
        network: 'network',
        title: 'title',
        description: 'description'
      }
    }

    expect(RoyaltiesEarnedEvent.validate(event)).toEqual(true)
    expect(RoyaltiesEarnedEvent.validate(null)).toEqual(false)
    expect(RoyaltiesEarnedEvent.validate({})).toEqual(false)
  })

  it('CollectionCreatedEvent static tests must pass', () => {
    const event: CollectionCreatedEvent = {
      type: Events.Type.BLOCKCHAIN,
      subType: Events.SubType.Blockchain.COLLECTION_CREATED,
      key: 'key',
      timestamp: 1,
      metadata: {
        creator: 'creator',
        name: 'name'
      }
    }

    expect(CollectionCreatedEvent.validate(event)).toEqual(true)
    expect(CollectionCreatedEvent.validate(null)).toEqual(false)
    expect(CollectionCreatedEvent.validate({})).toEqual(false)
  })
})
