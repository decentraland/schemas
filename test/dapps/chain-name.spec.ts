import { expect } from 'expect'
import { ChainId, ChainName, chainNameSchema, getChainId } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateChainName = generateLazyValidator(chainNameSchema)

describe('ChainName tests', () => {
  const chainName: ChainName = ChainName.ETHEREUM_KOVAN

  testTypeSignature({ schema: chainNameSchema }, chainName)

  it('static tests must pass', () => {
    expect(validateChainName(chainName)).toEqual(true)
    expect(validateChainName(null)).toEqual(false)
    expect(validateChainName({})).toEqual(false)
  })

  it('Should get a valid chain id', () => {
    expect(getChainId(ChainName.ETHEREUM_MAINNET)).toEqual(ChainId.ETHEREUM_MAINNET)
  })

  it('Should get null if the chain name is not valid', () => {
    expect(getChainId('invalid chain' as ChainName)).toEqual(null)
  })
})
