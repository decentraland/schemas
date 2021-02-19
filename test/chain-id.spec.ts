import expect from 'expect'
import { ChainId } from '../src'
import { testTypeSignature } from './test-utils'

describe('ChainId tests', () => {
  const chainId: ChainId = ChainId.ETHEREUM_KOVAN

  testTypeSignature(ChainId, chainId)

  it('static tests must pass', () => {
    expect(ChainId.validate(chainId)).toEqual(true)
    expect(ChainId.validate(null)).toEqual(false)
    expect(ChainId.validate({})).toEqual(false)
  })
})
