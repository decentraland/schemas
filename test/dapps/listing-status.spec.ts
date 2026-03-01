import { expect } from 'expect'
import { ListingStatus, listingStatusSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateListingStatus = generateLazyValidator(listingStatusSchema)

describe('ListingStatus tests', () => {
  const listingStatus: ListingStatus = ListingStatus.OPEN

  testTypeSignature({ schema: listingStatusSchema }, listingStatus)

  it('static tests must pass', () => {
    expect(validateListingStatus(listingStatus)).toEqual(true)
    expect(validateListingStatus(null)).toEqual(false)
    expect(validateListingStatus({})).toEqual(false)
  })
})
