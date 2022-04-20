import expect from 'expect'
import { EthAddress, IPFSv2, Color3 } from '../../src/misc'

describe('Misc tests', () => {
  it('EthAddress static tests must pass', () => {
    expect(EthAddress.validate('0x00000000000000000000000000000000000000000')).toEqual(false)
    expect(EthAddress.validate('0x0000000000000000000000000000000000000000')).toEqual(true)
    expect(EthAddress.validate('0x000000000000000000000000000000000000000')).toEqual(false)
    expect(EthAddress.validate(null)).toEqual(false)
    expect(EthAddress.validate({})).toEqual(false)
  })
  it('IPFSv2 static tests must pass', () => {
    expect(IPFSv2.validate('ba0000000000000000000000000000000000000000000000000000000000')).toEqual(false)
    expect(IPFSv2.validate('ba000000000000000000000000000000000000000000000000000000000')).toEqual(true)
    expect(IPFSv2.validate('00000000000000000000000000000000000000000000000000000000000')).toEqual(false)
    expect(IPFSv2.validate('ab00000000000000000000000000000000000000000000000000000000')).toEqual(false)
    expect(IPFSv2.validate(null)).toEqual(false)
    expect(IPFSv2.validate({})).toEqual(false)
  })
  it('Color3 static tests must pass', () => {
    expect(Color3.validate('rgb(255,255,255)')).toEqual(false)
    expect(Color3.validate(null)).toEqual(false)
    expect(Color3.validate({})).toEqual(false)
    expect(Color3.validate({ r: -1, g: -1, b: -1 })).toEqual(false)
    expect(Color3.validate({ r: 0, g: 0, b: 0 })).toEqual(true)
    expect(Color3.validate({ r: 1, g: 1, b: 1 })).toEqual(true)
    expect(Color3.validate({ r: 2, g: 2, b: 2 })).toEqual(false)
  })
})
