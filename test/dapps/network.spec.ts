import expect from 'expect'
import { Network } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Network tests', () => {
  const network: Network = Network.ETHEREUM

  testTypeSignature(Network, network)

  it('static tests must pass', () => {
    expect(Network.validate(network)).toEqual(true)
    expect(Network.validate(null)).toEqual(false)
    expect(Network.validate({})).toEqual(false)
  })
})
