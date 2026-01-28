import expect from 'expect'
import { Color3, Color4, EthAddress } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('EthAddress tests', () => {
  const ethAddress = '0x87956abC4078a0Cc3b89b419928b857B8AF826ed'
  testTypeSignature(EthAddress, ethAddress)

  it('static tests must pass', () => {
    expect(EthAddress.validate(ethAddress)).toEqual(true)
    expect(EthAddress.validate(null)).toEqual(false)
    expect(EthAddress.validate({})).toEqual(false)
  })
})

describe('Color3 tests', () => {
  const color = { r: 0.2, g: 0.1, b: 0.9 }
  const invalidColor = { r: 1.2, g: 1.1, b: 1.9 }

  testTypeSignature(Color3, color)

  it('static tests must pass', () => {
    expect(Color3.validate(color)).toEqual(true)
    expect(Color3.validate(null)).toEqual(false)
    expect(Color3.validate({})).toEqual(false)
  })

  it('out of range rgb color validation result should be false', () => {
    expect(Color3.validate(invalidColor)).toBeFalsy()
  })
})

describe('Color4 tests', () => {
  const color = { r: 0.2, g: 0.1, b: 0.9, a: 0.5 }
  const invalidColor = { r: 1.2, g: 1.1, b: 1.9, a: 1.5 }

  testTypeSignature(Color4, color)

  it('static tests must pass', () => {
    expect(Color4.validate(color)).toEqual(true)
    expect(Color4.validate(null)).toEqual(false)
    expect(Color4.validate({})).toEqual(false)
  })

  it('out of range rgb color validation result should be false', () => {
    expect(Color4.validate(invalidColor)).toBeFalsy()
  })
})
