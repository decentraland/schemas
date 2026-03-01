import { expect } from 'expect'
import { readFileSync } from 'fs'
import { color3Schema, ethAddressSchema, ipfsv2Schema } from '../../src/misc'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateColor3 = generateLazyValidator(color3Schema)
const validateEthAddress = generateLazyValidator(ethAddressSchema)
const validateIPFSv2 = generateLazyValidator(ipfsv2Schema)

describe('sanity of generated types', () => {
  const report = readFileSync('./report/schemas.api.md').toString()

  it("resulting types don't include /// <reference", () => {
    const matches = report.match(/<reference .*/) || []
    expect(matches).toHaveLength(0)
  })
})

describe('Misc tests', () => {
  it('EthAddress static tests must pass', () => {
    expect(validateEthAddress('0x00000000000000000000000000000000000000000')).toEqual(false)
    expect(validateEthAddress('0x0000000000000000000000000000000000000000')).toEqual(true)
    expect(validateEthAddress('0x000000000000000000000000000000000000000')).toEqual(false)
    expect(validateEthAddress(null)).toEqual(false)
    expect(validateEthAddress({})).toEqual(false)
  })
  it('IPFSv2 static tests must pass', () => {
    expect(validateIPFSv2('ba0000000000000000000000000000000000000000000000000000000000')).toEqual(false)
    expect(validateIPFSv2('ba000000000000000000000000000000000000000000000000000000000')).toEqual(true)
    expect(validateIPFSv2('00000000000000000000000000000000000000000000000000000000000')).toEqual(false)
    expect(validateIPFSv2('ab00000000000000000000000000000000000000000000000000000000')).toEqual(false)
    expect(validateIPFSv2(null)).toEqual(false)
    expect(validateIPFSv2({})).toEqual(false)
  })
  it('Color3 static tests must pass', () => {
    expect(validateColor3('rgb(255,255,255)')).toEqual(false)
    expect(validateColor3(null)).toEqual(false)
    expect(validateColor3({})).toEqual(false)
    expect(validateColor3({ r: -1, g: -1, b: -1 })).toEqual(false)
    expect(validateColor3({ r: 0, g: 0, b: 0 })).toEqual(true)
    expect(validateColor3({ r: 1, g: 1, b: 1 })).toEqual(true)
    expect(validateColor3({ r: 2, g: 2, b: 2 })).toEqual(false)
  })
})
