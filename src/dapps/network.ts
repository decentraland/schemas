import type { JSONSchema } from '../validation/types.js'

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
export const networkSchema: JSONSchema<Network> = {
  type: 'string',
  enum: Object.values(Network)
}
