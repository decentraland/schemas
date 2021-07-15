import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

export enum Rarity {
  UNIQUE = 'unique',
  MYTHIC = 'mythic',
  LEGENDARY = 'legendary',
  EPIC = 'epic',
  RARE = 'rare',
  UNCOMMON = 'uncommon',
  COMMON = 'common',
}

export namespace Rarity {
  export const schema: JSONSchema<Rarity> = {
    type: 'string',
    enum: Object.values(Rarity),
  }

  export const validate: ValidateFunction<Rarity> = generateValidator(schema)

  const maxSupplyByRarity: Record<Rarity, number> = {
    [Rarity.UNIQUE]: 1,
    [Rarity.MYTHIC]: 10,
    [Rarity.LEGENDARY]: 100,
    [Rarity.EPIC]: 1000,
    [Rarity.RARE]: 10000,
    [Rarity.UNCOMMON]: 100000,
    [Rarity.COMMON]: 1000000,
  }

  export function getMaxSupply(rarity: Rarity): number {
    return maxSupplyByRarity[rarity]
  }
}
