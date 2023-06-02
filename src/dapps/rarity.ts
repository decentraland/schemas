import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export enum Rarity {
  UNIQUE = 'unique',
  MYTHIC = 'mythic',
  LEGENDARY = 'legendary',
  EPIC = 'epic',
  RARE = 'rare',
  UNCOMMON = 'uncommon',
  COMMON = 'common'
}

export namespace Rarity {
  export const schema: JSONSchema<Rarity> = {
    type: 'string',
    enum: Object.values(Rarity)
  }

  export const validate: ValidateFunction<Rarity> = generateLazyValidator(schema)

  const maxSupplyByRarity: Record<Rarity, number> = {
    [Rarity.UNIQUE]: 1,
    [Rarity.MYTHIC]: 10,
    [Rarity.LEGENDARY]: 100,
    [Rarity.EPIC]: 1000,
    [Rarity.RARE]: 5000,
    [Rarity.UNCOMMON]: 10000,
    [Rarity.COMMON]: 100000
  }

  const lightColorByRarity: Record<Rarity, string> = {
    [Rarity.UNIQUE]: '#FFF280',
    [Rarity.MYTHIC]: '#F6C1FF',
    [Rarity.LEGENDARY]: '#DF9CFF',
    [Rarity.EPIC]: '#81D1FF',
    [Rarity.RARE]: '#73FFAF',
    [Rarity.UNCOMMON]: '#FFD6B2',
    [Rarity.COMMON]: '#ACF8F8'
  }

  const colorByRarity: Record<Rarity, string> = {
    [Rarity.UNIQUE]: '#FEA217',
    [Rarity.MYTHIC]: '#FF4BED',
    [Rarity.LEGENDARY]: '#A14BF3',
    [Rarity.EPIC]: '#438FFF',
    [Rarity.RARE]: '#34CE76',
    [Rarity.UNCOMMON]: '#FF8362',
    [Rarity.COMMON]: '#73D3D3'
  }

  export function getMaxSupply(rarity: Rarity): number {
    return maxSupplyByRarity[rarity]
  }

  export function getColor(rarity: Rarity): string {
    return colorByRarity[rarity]
  }

  export function getGradient(rarity: Rarity): [string, string] {
    return [lightColorByRarity[rarity], colorByRarity[rarity]]
  }
}
