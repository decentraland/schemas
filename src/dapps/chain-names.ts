import { ChainId } from './chain-id'

/**
 * Different supported chain ids
 * @alpha
 */
export const ChainNames = {
  [ChainId.ETHEREUM_MAINNET]: 'mainnet',
  [ChainId.ETHEREUM_ROPSTEN]: 'ropsten',
  [ChainId.ETHEREUM_RINKEBY]: 'rinkeby',
  [ChainId.ETHEREUM_GOERLI]: 'goerli',
  [ChainId.ETHEREUM_KOVAN]: 'kovan',
  [ChainId.MATIC_MAINNET]: 'matic',
  [ChainId.MATIC_MUMBAI]: 'mumbai',
}
