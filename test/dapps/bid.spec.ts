import expect from 'expect'
import { Bid, ChainId, ListingStatus, Network } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Bid tests', () => {
  const bid: Bid = {
    id: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d-2041694201525630780780247644590609268611-0xc3e43a67c0b9505a690dd80491cf7bf6a3dc26e6',
    bidAddress: '0x2041694201525630780780247644590609268611',
    bidder: '0xc3e43a67c0b9505a690dd80491cf7bf6a3dc26e6',
    seller: '0x81e4fb0c64bf49f89b57f6648562fc9a791b2e92',
    price: '5000000000000000000000',
    fingerprint: '0x',
    blockchainId: '0x8f5a0664d8ff4d91241540b1dc372cfd76ac22eb9c5522be46a5459c6cebe80a',
    blockNumber: '12828878',
    contractAddress: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    tokenId: '2041694201525630780780247644590609268611',
    status: ListingStatus.OPEN,
    network: Network.ETHEREUM,
    chainId: ChainId.ETHEREUM_MAINNET,
    expiresAt: 1627689634000,
    createdAt: 1626316584000,
    updatedAt: 1626316584000
  }

  testTypeSignature(Bid, bid)

  it('static tests must pass', () => {
    expect(Bid.validate(bid)).toEqual(true)
    expect(Bid.validate(null)).toEqual(false)
    expect(Bid.validate({})).toEqual(false)
  })
})
