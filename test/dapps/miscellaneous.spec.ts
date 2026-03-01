import { expect } from 'expect'
import { color3Schema, ethAddressSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateColor3 = generateLazyValidator(color3Schema)
const validateEthAddress = generateLazyValidator(ethAddressSchema)

describe('EthAddress tests', () => {
  const ethAddress = '0x87956abC4078a0Cc3b89b419928b857B8AF826ed'
  testTypeSignature({ schema: ethAddressSchema }, ethAddress)

  it('static tests must pass', () => {
    expect(validateEthAddress(ethAddress)).toEqual(true)
    expect(validateEthAddress(null)).toEqual(false)
    expect(validateEthAddress({})).toEqual(false)
  })
})

describe('Color3 tests', () => {
  const color = { r: 0.2, g: 0.1, b: 0.9 }
  const invalidColor = { r: 1.2, g: 1.1, b: 1.9 }

  testTypeSignature({ schema: color3Schema }, color)

  it('static tests must pass', () => {
    expect(validateColor3(color)).toEqual(true)
    expect(validateColor3(null)).toEqual(false)
    expect(validateColor3({})).toEqual(false)
  })

  it('out of range rgb color validation result should be false', () => {
    expect(validateColor3(invalidColor)).toBeFalsy()
  })
})
