import expect from 'expect'
import { Rarity } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Rarity tests', () => {
  const mythic: Rarity = Rarity.MYTHIC

  testTypeSignature(Rarity, mythic)

  it('static tests must pass', () => {
    expect(Rarity.validate(mythic)).toEqual(true)
    expect(Rarity.validate(null)).toEqual(false)
    expect(Rarity.validate({})).toEqual(false)
  })

  it('should return max supply', () => {
    expect(Rarity.getMaxSupply(mythic)).toEqual(10)
  })

  it('should return color', () => {
    expect(Rarity.getColor(mythic)).toEqual('#FF63E1')
  })

  it('should return gradient', () => {
    const gradient = Rarity.getGradient(mythic)
    expect(gradient.length).toBe(2)
    expect(gradient[0]).toEqual('#FB7DE3')
    expect(gradient[1]).toEqual('#FF63E1')
  })
})
