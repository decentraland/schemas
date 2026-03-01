import { expect } from 'expect'
import { ChainId } from '../../src'
import { Network } from '../../src/dapps/network'
import { type RentalListingCreation, rentalListingCreationSchema } from '../../src/dapps/rentals-listings'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateRentalListingCreation = generateLazyValidator(rentalListingCreationSchema)

describe('Rental listings creation tests', () => {
  let baseRentalListingCreation: RentalListingCreation

  beforeEach(() => {
    baseRentalListingCreation = {
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_GOERLI,
      expiration: 23423,
      signature: '0x0',
      tokenId: '0',
      contractAddress: '0xCACA50770373E85DBe427Fdc46DE3e996a74f446',
      rentalContractAddress: '0x7331871C7d3AB25BD4F37179650c76fe2Cc6F6a6',
      nonces: ['0', '0', '0'],
      periods: [
        {
          minDays: 20,
          maxDays: 20,
          pricePerDay: '1000000'
        }
      ],
      target: '0x0000000000000000000000000000000000000000'
    }
  })

  it('should return as invalid a creation rental listing with an invalid network', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        network: 'A non existent network'
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an invalid chain id', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        chainId: 3242342
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an empty signature', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        signature: ''
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an empty token id', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        tokenId: ''
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an array of nonces with length lower than 3', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        nonces: []
      })
    ).toBe(false)
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        nonces: ['']
      })
    ).toBe(false)
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        nonces: ['', '']
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with a contract address that is not an address', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        contractAddress: '0x0'
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with a rental contract address that is not an address', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        rentalContractAddress: '0x0'
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an empty array of periods', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        periods: []
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an array of period where one has an amount of min days less than 0', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        periods: [{ minDays: -2, maxDays: 20, price: '10000' }]
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an array of period where one has an amount of max days less than 0', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        periods: [{ minDays: 20, maxDays: -2, price: '10000' }]
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an array of period where one has an invalid price', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        periods: [{ minDays: 20, maxDays: 20, price: 'price' }]
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing with an array of period with length greater than 100', () => {
    expect(
      validateRentalListingCreation({
        ...baseRentalListingCreation,
        periods: Array.from({ length: 10 }, (_, i) => ({
          minDays: 20,
          maxDays: 20 + i,
          price: '1000'
        }))
      })
    ).toBe(false)
  })

  it('should return as invalid a creation rental listing that has less properties as required', () => {
    const rentalListingCreation = {
      ...baseRentalListingCreation
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { tokenId, ...rentalListingCreationWithoutTokenId } = rentalListingCreation

    expect(
      validateRentalListingCreation({
        rentalListingCreationWithoutTokenId
      })
    ).toBe(false)
  })

  it('should return as valid a creation rental listing that has all properties correctly set', () => {
    expect(validateRentalListingCreation(baseRentalListingCreation)).toBe(true)
  })
})
