import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

/**
 * Different supported networks
 * @alpha
 */
export enum Network {
  ETHEREUM = 'ETHEREUM',
  MATIC = 'MATIC',
  AVALANCHE = 'AVALANCHE',
  BSC = 'BINANCE SMART CHAIN',
  OPTIMISM = 'OPTIMISM',
  ARBITRUM = 'ARBITRUM',
  FANTOM = 'FANTOM'
}

/**
 * @alpha
 */
export namespace Network {
  export const schema: JSONSchema<Network> = {
    type: 'string',
    enum: Object.values(Network)
  }

  export const validate: ValidateFunction<Network> = generateLazyValidator(schema)
}
