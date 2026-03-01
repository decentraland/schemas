import { expect } from 'expect'
import { Network, networkSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateNetwork = generateLazyValidator(networkSchema)

describe('Network tests', () => {
  const network: Network = Network.ETHEREUM

  testTypeSignature({ schema: networkSchema }, network)

  it('static tests must pass', () => {
    expect(validateNetwork(network)).toEqual(true)
    expect(validateNetwork(null)).toEqual(false)
    expect(validateNetwork({})).toEqual(false)
  })
})
