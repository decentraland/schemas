import { ContractNetwork } from '../platform/item/linked-wearable-mappings'
import { ChainId } from './chain-id'

/**
 * Exhaustive mapping from ContractNetwork to ChainId.
 *
 * Typed as `Record<ContractNetwork, ChainId>` so that adding a new
 * ContractNetwork member without a corresponding entry here will cause
 * a compile-time error, preventing the two enums from drifting apart.
 *
 * @alpha
 */
export const contractNetworkToChainId: Record<ContractNetwork, ChainId> = {
  [ContractNetwork.MAINNET]: ChainId.ETHEREUM_MAINNET,
  [ContractNetwork.MATIC]: ChainId.MATIC_MAINNET,
  [ContractNetwork.SEPOLIA]: ChainId.ETHEREUM_SEPOLIA,
  [ContractNetwork.AMOY]: ChainId.MATIC_AMOY,
  [ContractNetwork.BASE_MAINNET]: ChainId.BASE_MAINNET,
  [ContractNetwork.BASE_SEPOLIA]: ChainId.BASE_SEPOLIA,
  [ContractNetwork.APE_MAINNET]: ChainId.APE_MAINNET,
  [ContractNetwork.APE_CALDERA]: ChainId.APE_CALDERA,
  [ContractNetwork.MONAD_MAINNET]: ChainId.MONAD_MAINNET,
  [ContractNetwork.MONAD_TESTNET]: ChainId.MONAD_TESTNET
}
