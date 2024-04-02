import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export enum Rarity {
  UNIQUE = 'unique',
  MYTHIC = 'mythic',
  EXOTIC = 'exotic',
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
    [Rarity.EXOTIC]: 50,
    [Rarity.LEGENDARY]: 100,
    [Rarity.EPIC]: 1000,
    [Rarity.RARE]: 5000,
    [Rarity.UNCOMMON]: 10000,
    [Rarity.COMMON]: 100000
  }

  const lightColorByRarity: Record<Rarity, string> = {
    [Rarity.UNIQUE]: '#FFE617',
    [Rarity.MYTHIC]: '#FB7DE3',
    [Rarity.EXOTIC]: '#E4FFB8',
    [Rarity.LEGENDARY]: '#A657ED',
    [Rarity.EPIC]: '#6397F2',
    [Rarity.RARE]: '#3AD682',
    [Rarity.UNCOMMON]: '#FF8563',
    [Rarity.COMMON]: '#D4E0E0'
  }

  const colorByRarity: Record<Rarity, string> = {
    [Rarity.UNIQUE]: '#FFB626',
    [Rarity.MYTHIC]: '#FF63E1',
    [Rarity.EXOTIC]: '#CAFF73',
    [Rarity.LEGENDARY]: '#842DDA',
    [Rarity.EPIC]: '#3D85E6',
    [Rarity.RARE]: '#36CF75',
    [Rarity.UNCOMMON]: '#ED6D4F',
    [Rarity.COMMON]: '#ABC1C1'
  }

  export function getMaxSupply(rarity: Rarity): number {
    return maxSupplyByRarity[rarity]
  }

  export function getColor(rarity: Rarity): string {
    return colorByRarity[rarity]
  }

  export function getRarities(): Rarity[] {
    return [
      Rarity.UNIQUE,
      Rarity.MYTHIC,
      Rarity.EXOTIC,
      Rarity.LEGENDARY,
      Rarity.EPIC,
      Rarity.RARE,
      Rarity.UNCOMMON,
      Rarity.COMMON
    ]
  }

  export function getGradient(rarity: Rarity): [string, string] {
    return [lightColorByRarity[rarity], colorByRarity[rarity]]
  }
}
