import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'

/**
 * Different supported chain names
 * @alpha
 */
export enum ChainName {
  ETHEREUM_MAINNET = 'Ethereum Mainnet',
  ETHEREUM_ROPSTEN = 'Ropsten',
  ETHEREUM_RINKEBY = 'Rinkeby',
  ETHEREUM_GOERLI = 'Goerli',
  ETHEREUM_KOVAN = 'Kovan',
  ETHEREUM_SEPOLIA = 'Sepolia',
  MATIC_MAINNET = 'Polygon',
  MATIC_MUMBAI = 'Mumbai',
  AVALANCHE_MAINNET = 'Avalanche Mainnet',
  BINANCE_MAINNET = 'Binance Smart Chain Mainnet',
  ARBITRUM_MAINNET = 'Arbitrum One',
  OPTIMISM_MAINNET = 'Optimism Mainnet'
}

/**
 * Get chain id by chain name
 * @alpha
 */
export function getChainId(chainName: ChainName): ChainId | null {
  switch (chainName) {
    case ChainName.ETHEREUM_MAINNET:
      return ChainId.ETHEREUM_MAINNET
    case ChainName.ETHEREUM_ROPSTEN:
      return ChainId.ETHEREUM_ROPSTEN
    case ChainName.ETHEREUM_RINKEBY:
      return ChainId.ETHEREUM_RINKEBY
    case ChainName.ETHEREUM_GOERLI:
      return ChainId.ETHEREUM_GOERLI
    case ChainName.ETHEREUM_KOVAN:
      return ChainId.ETHEREUM_KOVAN
    case ChainName.ETHEREUM_SEPOLIA:
      return ChainId.ETHEREUM_SEPOLIA
    case ChainName.MATIC_MAINNET:
      return ChainId.MATIC_MAINNET
    case ChainName.MATIC_MUMBAI:
      return ChainId.MATIC_MUMBAI
    case ChainName.AVALANCHE_MAINNET:
      return ChainId.AVALANCHE_MAINNET
    case ChainName.BINANCE_MAINNET:
      return ChainId.BNB_MAINNET
    case ChainName.ARBITRUM_MAINNET:
      return ChainId.ARBITRUM_MAINNET
    case ChainName.OPTIMISM_MAINNET:
      return ChainId.OPTIMISM_MAINNET
    default:
      return null
  }
}

/**
 * @alpha
 */
export namespace ChainName {
  export const schema: JSONSchema<ChainName> = {
    type: 'string',
    enum: Object.values(ChainName)
  }

  export const validate: ValidateFunction<ChainName> = generateLazyValidator(schema)
}
