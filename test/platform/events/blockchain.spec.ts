import { expect } from 'expect'
import {
  BidAcceptedEvent,
  CollectionCreatedEvent,
  EventType,
  EventSubTypeBlockchain,
  ItemPublishedEvent,
  ItemSoldEvent,
  RentalEndedEvent,
  RentalStartedEvent,
  RoyaltiesEarnedEvent,
  bidAcceptedEventSchema,
  collectionCreatedEventSchema,
  itemPublishedEventSchema,
  itemSoldEventSchema,
  rentalEndedEventSchema,
  rentalStartedEventSchema,
  royaltiesEarnedEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateBidAcceptedEvent = generateLazyValidator(bidAcceptedEventSchema)
const validateCollectionCreatedEvent = generateLazyValidator(collectionCreatedEventSchema)
const validateItemPublishedEvent = generateLazyValidator(itemPublishedEventSchema)
const validateItemSoldEvent = generateLazyValidator(itemSoldEventSchema)
const validateRentalEndedEvent = generateLazyValidator(rentalEndedEventSchema)
const validateRentalStartedEvent = generateLazyValidator(rentalStartedEventSchema)
const validateRoyaltiesEarnedEvent = generateLazyValidator(royaltiesEarnedEventSchema)

describe('Blockchain Events tests', () => {
  it('BidAcceptedEvent static tests must pass', () => {
    const event: BidAcceptedEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.BID_ACCEPTED,
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

    expect(validateBidAcceptedEvent(event)).toEqual(true)
    expect(validateBidAcceptedEvent(null)).toEqual(false)
    expect(validateBidAcceptedEvent({})).toEqual(false)
  })

  it('ItemSold static tests must pass', () => {
    const event: ItemSoldEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.ITEM_SOLD,
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

    expect(validateItemSoldEvent(event)).toEqual(true)
    expect(validateItemSoldEvent(null)).toEqual(false)
    expect(validateItemSoldEvent({})).toEqual(false)
  })

  it('ItemPublished static tests must pass', () => {
    const event: ItemPublishedEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.ITEM_PUBLISHED,
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

    expect(validateItemPublishedEvent(event)).toEqual(true)
    expect(validateItemPublishedEvent(null)).toEqual(false)
    expect(validateItemPublishedEvent({})).toEqual(false)
  })

  it('RentalEndedEvent static tests must pass', () => {
    const event: RentalEndedEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.RENTAL_ENDED,
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

    expect(validateRentalEndedEvent(event)).toEqual(true)
    expect(validateRentalEndedEvent(null)).toEqual(false)
    expect(validateRentalEndedEvent({})).toEqual(false)
  })

  it('RentalStartedEvent static tests must pass', () => {
    const event: RentalStartedEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.RENTAL_STARTED,
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

    expect(validateRentalStartedEvent(event)).toEqual(true)
    expect(validateRentalStartedEvent(null)).toEqual(false)
    expect(validateRentalStartedEvent({})).toEqual(false)
  })

  it('RoyaltiesEarnedEvent static tests must pass', () => {
    const event: RoyaltiesEarnedEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.ROYALTIES_EARNED,
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

    expect(validateRoyaltiesEarnedEvent(event)).toEqual(true)
    expect(validateRoyaltiesEarnedEvent(null)).toEqual(false)
    expect(validateRoyaltiesEarnedEvent({})).toEqual(false)
  })

  it('CollectionCreatedEvent static tests must pass', () => {
    const event: CollectionCreatedEvent = {
      type: EventType.BLOCKCHAIN,
      subType: EventSubTypeBlockchain.COLLECTION_CREATED,
      key: 'key',
      timestamp: 1,
      metadata: {
        creator: 'creator',
        name: 'name'
      }
    }

    expect(validateCollectionCreatedEvent(event)).toEqual(true)
    expect(validateCollectionCreatedEvent(null)).toEqual(false)
    expect(validateCollectionCreatedEvent({})).toEqual(false)
  })
})
