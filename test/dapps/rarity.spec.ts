import { expect } from 'expect'
import { Rarity, raritySchema, getRarityMaxSupply, getRarityColor, getRarityGradient } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateRarity = generateLazyValidator(raritySchema)

describe('Rarity tests', () => {
  const mythic: Rarity = Rarity.MYTHIC

  testTypeSignature({ schema: raritySchema }, mythic)

  it('static tests must pass', () => {
    expect(validateRarity(mythic)).toEqual(true)
    expect(validateRarity(null)).toEqual(false)
    expect(validateRarity({})).toEqual(false)
  })

  it('should return max supply', () => {
    expect(getRarityMaxSupply(mythic)).toEqual(10)
  })

  it('should return color', () => {
    expect(getRarityColor(mythic)).toEqual('#FF63E1')
  })

  it('should return gradient', () => {
    const gradient = getRarityGradient(mythic)
    expect(gradient.length).toBe(2)
    expect(gradient[0]).toEqual('#FB7DE3')
    expect(gradient[1]).toEqual('#FF63E1')
  })
})
