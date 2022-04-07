import expect from 'expect'
import { ListingStatus } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('ListingStatus tests', () => {
  const listingStatus: ListingStatus = ListingStatus.OPEN

  testTypeSignature(ListingStatus, listingStatus)

  it('static tests must pass', () => {
    expect(ListingStatus.validate(listingStatus)).toEqual(true)
    expect(ListingStatus.validate(null)).toEqual(false)
    expect(ListingStatus.validate({})).toEqual(false)
  })
})
