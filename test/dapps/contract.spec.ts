import expect from 'expect'
import { ChainId, Contract, Network, NFTCategory } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Contract tests', () => {
  const contract: Contract = {
    name: 'Aquarium Hosts',
    address: '0x1286dad1da5233a63a5d55fcf9e834feb14e1d6d',
    category: NFTCategory.WEARABLE,
    network: Network.MATIC,
    chainId: ChainId.MATIC_MAINNET
  }

  testTypeSignature(Contract, contract)

  it('static tests must pass', () => {
    expect(Contract.validate(contract)).toEqual(true)
    expect(Contract.validate(null)).toEqual(false)
    expect(Contract.validate({})).toEqual(false)
  })
})
