import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

import { ChainName } from './chain-name'

/**
 * Different supported chain ids
 * @alpha
 */
export enum ChainId {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_ROPSTEN = 3,
  ETHEREUM_RINKEBY = 4,
  ETHEREUM_GOERLI = 5,
  ETHEREUM_KOVAN = 42,
  MATIC_MAINNET = 137,
  MATIC_MUMBAI = 80001
}

/**
 * Get the chain name by chain id
 * @alpha
 */
export function getChainName(chainId: ChainId): ChainName | null {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return ChainName.ETHEREUM_MAINNET
    case ChainId.ETHEREUM_ROPSTEN:
      return ChainName.ETHEREUM_ROPSTEN
    case ChainId.ETHEREUM_RINKEBY:
      return ChainName.ETHEREUM_RINKEBY
    case ChainId.ETHEREUM_GOERLI:
      return ChainName.ETHEREUM_GOERLI
    case ChainId.ETHEREUM_KOVAN:
      return ChainName.ETHEREUM_KOVAN
    case ChainId.MATIC_MAINNET:
      return ChainName.MATIC_MAINNET
    case ChainId.MATIC_MUMBAI:
      return ChainName.MATIC_MUMBAI
    default:
      return null
  }
}

/**
 * Get the chain name by chain id
 * @alpha
 */
export function getURNProtocol(chainId: ChainId): string {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return 'mainnet'
    case ChainId.ETHEREUM_ROPSTEN:
      return 'ropsten'
    case ChainId.ETHEREUM_RINKEBY:
      return 'rinkeby'
    case ChainId.ETHEREUM_GOERLI:
      return 'goerli'
    case ChainId.ETHEREUM_KOVAN:
      return 'kovan'
    case ChainId.MATIC_MAINNET:
      return 'matic'
    case ChainId.MATIC_MUMBAI:
      return 'mumbai'
  }
}

/**
 * @alpha
 */
export namespace ChainId {
  export const schema: JSONSchema<ChainId> = {
    type: 'number',
    enum: Object.values(ChainId)
  }

  export const validate: ValidateFunction<ChainId> = generateValidator(schema)
}
