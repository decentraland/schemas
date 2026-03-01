import { expect } from 'expect'
import { ChainId, type Contract, contractSchema, Network, NFTCategory } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateContract = generateLazyValidator(contractSchema)

describe('Contract tests', () => {
  const contract: Contract = {
    name: 'Aquarium Hosts',
    address: '0x1286dad1da5233a63a5d55fcf9e834feb14e1d6d',
    category: NFTCategory.WEARABLE,
    network: Network.MATIC,
    chainId: ChainId.MATIC_MAINNET
  }

  testTypeSignature({ schema: contractSchema }, contract)

  it('static tests must pass', () => {
    expect(validateContract(contract)).toEqual(true)
    expect(validateContract(null)).toEqual(false)
    expect(validateContract({})).toEqual(false)
  })
})
