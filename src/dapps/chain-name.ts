import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'

/**
 * Different supported chain names
 * @alpha
 */
export enum ChainName {
  ETHEREUM_MAINNET = 'MAINNET',
  ETHEREUM_ROPSTEN = 'ROPSTEN',
  ETHEREUM_RINKEBY = 'RINKEBY',
  ETHEREUM_GOERLI = 'GOERLI',
  ETHEREUM_KOVAN = 'KOVAN',
  MATIC_MAINNET = 'MATIC',
  MATIC_MUMBAI = 'MUMBAI',
}

/**
 * Get chain id by chain name
 * @alpha
 */
export function getChainId(chainId: ChainName): ChainId | null {
  switch (chainId) {
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
    enum: Object.values(ChainName),
  }

  export const validate: ValidateFunction<ChainName> = generateValidator(schema)
}
