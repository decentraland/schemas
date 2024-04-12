import expect from 'expect'
import { ChainId, ChainName, getChainName, getURNProtocol, Network } from '../../src'
import { getNetwork, getNetworkMapping } from '../../src/dapps/chain-id'
import { testTypeSignature } from '../test-utils'

describe('ChainId tests', () => {
  const chainId: ChainId = ChainId.ETHEREUM_KOVAN

  testTypeSignature(ChainId, chainId)

  it('static tests must pass', () => {
    expect(ChainId.validate(chainId)).toEqual(true)
    expect(ChainId.validate(null)).toEqual(false)
    expect(ChainId.validate({})).toEqual(false)
  })

  it('Should get a valid chain name', () => {
    expect(getChainName(ChainId.ETHEREUM_MAINNET)).toEqual(ChainName.ETHEREUM_MAINNET)
  })

  it('Should get null if the chain id is not valid', () => {
    expect(getChainName(-1 as ChainId)).toEqual(null)
  })

  it('Should get a valid URN protocol', () => {
    expect(getURNProtocol(ChainId.MATIC_MAINNET)).toEqual('matic')
  })

  it('Should get a valid network mapping', () => {
    expect(getNetworkMapping(ChainId.ETHEREUM_KOVAN)).toEqual({
      [Network.ETHEREUM]: ChainId.ETHEREUM_KOVAN,
      [Network.MATIC]: ChainId.MATIC_MUMBAI,
      [Network.AVALANCHE]: ChainId.AVALANCHE_MAINNET,
      [Network.BSC]: ChainId.BSC_MAINNET,
      [Network.ARBITRUM]: ChainId.ARBITRUM_MAINNET,
      [Network.OPTIMISM]: ChainId.OPTIMISM_MAINNET,
      [Network.FANTOM]: ChainId.FANTOM_MAINNET
    })
  })

  it('Should get a valid network', () => {
    expect(getNetwork(ChainId.MATIC_MUMBAI)).toEqual(Network.MATIC)
  })

  it('Should get a valid network', () => {
    expect(getNetwork(ChainId.MATIC_AMOY)).toEqual(Network.MATIC)
  })
})
