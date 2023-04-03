import expect from 'expect'
import { ChainId, ListingStatus, Network, Order } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Order tests', () => {
  const order: Order = {
    id: '0x4b20989f296d2a357fe903d155d4302da25e36c91d164d98a85a6ee9a1c88e43',
    marketplaceAddress: '0x3041694201525630780780247644590609268596',
    contractAddress: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    tokenId: '2041694201525630780780247644590609268596',
    owner: '0x09217b071268aa902f7287f78b16fe84cccbbc43',
    buyer: '0x361b9fbf20ed8de4b62cd5b0ccdf36face38bdc4',
    price: '6500000000000000000000',
    status: ListingStatus.OPEN,
    network: Network.ETHEREUM,
    chainId: ChainId.ETHEREUM_MAINNET,
    expiresAt: 1640908800000,
    createdAt: 1626308259000,
    updatedAt: 1626310162000,
    issuedId: '1'
  }

  testTypeSignature(Order, order)

  it('static tests must pass', () => {
    expect(Order.validate(order)).toEqual(true)
    expect(Order.validate(null)).toEqual(false)
    expect(Order.validate({})).toEqual(false)
  })
})
