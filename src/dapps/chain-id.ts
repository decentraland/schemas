import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

import { ChainName } from './chain-name'
import { Network } from './network'

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
  ETHEREUM_SEPOLIA = 11155111,
  MATIC_MAINNET = 137,
  MATIC_MUMBAI = 80001,
  MATIC_AMOY = 80002,
  BSC_MAINNET = 56,
  OPTIMISM_MAINNET = 10,
  ARBITRUM_MAINNET = 42161,
  FANTOM_MAINNET = 250,
  AVALANCHE_MAINNET = 43114
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
    case ChainId.ETHEREUM_SEPOLIA:
      return ChainName.ETHEREUM_SEPOLIA
    case ChainId.MATIC_MAINNET:
      return ChainName.MATIC_MAINNET
    case ChainId.MATIC_MUMBAI:
      return ChainName.MATIC_MUMBAI
    case ChainId.MATIC_AMOY:
      return ChainName.MATIC_AMOY
    case ChainId.BSC_MAINNET:
      return ChainName.BINANCE_MAINNET
    case ChainId.ARBITRUM_MAINNET:
      return ChainName.ARBITRUM_MAINNET
    case ChainId.OPTIMISM_MAINNET:
      return ChainName.OPTIMISM_MAINNET
    case ChainId.FANTOM_MAINNET:
      return ChainName.FANTOM_MAINNET
    case ChainId.AVALANCHE_MAINNET:
      return ChainName.AVALANCHE_MAINNET
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
      return 'ethereum'
    case ChainId.ETHEREUM_ROPSTEN:
      return 'ropsten'
    case ChainId.ETHEREUM_RINKEBY:
      return 'rinkeby'
    case ChainId.ETHEREUM_GOERLI:
      return 'goerli'
    case ChainId.ETHEREUM_KOVAN:
      return 'kovan'
    case ChainId.ETHEREUM_SEPOLIA:
      return 'sepolia'
    case ChainId.MATIC_MAINNET:
      return 'matic'
    case ChainId.MATIC_MUMBAI:
      return 'mumbai'
    case ChainId.MATIC_AMOY:
      return 'amoy'
    default:
      return ''
  }
}

/**
 * Using a base chain id, it'll map the corresponding chain id for the ethereum and matic networks.
 * For example, if trying to determine which chain id is used to map Goerli in Matic you'd do:
 *    getNetworkMapping(ChainId.ETHEREUM_GOERLI)[Network.MATIC]
 * @alpha
 */
export function getNetworkMapping(chainId: ChainId): Record<Network, ChainId> {
  const baseEVMCompatibleChains = {
    [Network.BSC]: ChainId.BSC_MAINNET,
    [Network.OPTIMISM]: ChainId.OPTIMISM_MAINNET,
    [Network.ARBITRUM]: ChainId.ARBITRUM_MAINNET,
    [Network.FANTOM]: ChainId.FANTOM_MAINNET,
    [Network.AVALANCHE]: ChainId.AVALANCHE_MAINNET
  }
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_MAINNET,
        [Network.MATIC]: ChainId.MATIC_MAINNET,
        ...baseEVMCompatibleChains
      }
    case ChainId.ETHEREUM_ROPSTEN:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_ROPSTEN,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
        ...baseEVMCompatibleChains
      }
    case ChainId.ETHEREUM_RINKEBY:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_RINKEBY,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
        ...baseEVMCompatibleChains
      }
    case ChainId.ETHEREUM_GOERLI:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_GOERLI,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
        ...baseEVMCompatibleChains
      }
    case ChainId.ETHEREUM_KOVAN:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_KOVAN,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
        ...baseEVMCompatibleChains
      }
    case ChainId.ETHEREUM_SEPOLIA:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_SEPOLIA,
        [Network.MATIC]: ChainId.MATIC_AMOY,
        ...baseEVMCompatibleChains
      }
    case ChainId.MATIC_MAINNET:
      return {
        [Network.ETHEREUM]: ChainId.MATIC_MAINNET,
        [Network.MATIC]: ChainId.MATIC_MAINNET,
        ...baseEVMCompatibleChains
      }
    case ChainId.MATIC_MUMBAI:
      return {
        [Network.ETHEREUM]: ChainId.MATIC_MUMBAI,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
        ...baseEVMCompatibleChains
      }
    case ChainId.MATIC_AMOY:
      return {
        [Network.ETHEREUM]: ChainId.MATIC_AMOY,
        [Network.MATIC]: ChainId.MATIC_AMOY,
        ...baseEVMCompatibleChains
      }
    default:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_MAINNET,
        [Network.MATIC]: ChainId.MATIC_MAINNET,
        ...baseEVMCompatibleChains
      }
  }
}

/**
 * Get's the network for a specific chain id
 * @alpha
 */
export function getNetwork(chainId: ChainId): Network {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
    case ChainId.ETHEREUM_ROPSTEN:
    case ChainId.ETHEREUM_GOERLI:
    case ChainId.ETHEREUM_KOVAN:
    case ChainId.ETHEREUM_RINKEBY:
    case ChainId.ETHEREUM_SEPOLIA:
      return Network.ETHEREUM
    case ChainId.MATIC_MAINNET:
    case ChainId.MATIC_MUMBAI:
    case ChainId.MATIC_AMOY:
      return Network.MATIC
    case ChainId.BSC_MAINNET:
      return Network.BSC
    case ChainId.OPTIMISM_MAINNET:
      return Network.OPTIMISM
    case ChainId.ARBITRUM_MAINNET:
      return Network.ARBITRUM
    case ChainId.FANTOM_MAINNET:
      return Network.FANTOM
    case ChainId.AVALANCHE_MAINNET:
      return Network.AVALANCHE
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

  export const validate: ValidateFunction<ChainId> = generateLazyValidator(schema)
}
