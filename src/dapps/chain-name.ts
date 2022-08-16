import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../validation'
import { ChainId } from './chain-id'

/**
 * Different supported chain names
 * @alpha
 */
export enum ChainName {
  ETHEREUM_MAINNET = 'Ethereum Mainnet',
  ETHEREUM_RINKEBY = 'Rinkeby',
  ETHEREUM_GOERLI = 'Goerli',
  ETHEREUM_KOVAN = 'Kovan',
  MATIC_MAINNET = 'Polygon',
  MATIC_MUMBAI = 'Mumbai'
}

/**
 * Get chain id by chain name
 * @alpha
 */
export function getChainId(chainName: ChainName): ChainId | null {
  switch (chainName) {
    case ChainName.ETHEREUM_MAINNET:
      return ChainId.ETHEREUM_MAINNET
    case ChainName.ETHEREUM_RINKEBY:
      return ChainId.ETHEREUM_RINKEBY
    case ChainName.ETHEREUM_GOERLI:
      return ChainId.ETHEREUM_GOERLI
    case ChainName.ETHEREUM_KOVAN:
      return ChainId.ETHEREUM_KOVAN
    case ChainName.MATIC_MAINNET:
      return ChainId.MATIC_MAINNET
    case ChainName.MATIC_MUMBAI:
      return ChainId.MATIC_MUMBAI
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

  export const validate: ValidateFunction<ChainName> =
    generateLazyValidator(schema)
}
