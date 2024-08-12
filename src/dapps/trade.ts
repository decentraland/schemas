import { ChainId } from './chain-id'
import { Network } from './network'

export enum TradeType {
  BID = 'bid',
  PUBLIC_NFT_ORDER = 'public_nft_order',
  PUBLIC_ITEM_ORDER = 'public_item_order'
}

export type TradeExternalCheck = {
  contractAddress: string
  selector: string
  value: string
  required: boolean
}

export type TradeChecks = {
  uses: number
  /** Expiration in milliseconds */
  expiration: number
  /** Effective since date in milliseconds */
  effective: number
  salt: string
  contractSignatureIndex: number
  signerSignatureIndex: number
  allowedRoot: string
  allowedProof?: string[]
  externalChecks: TradeExternalCheck[]
}

export enum TradeAssetType {
  ERC20 = 1,
  USD_PEGGED_MANA = 2,
  ERC721 = 3,
  COLLECTION_ITEM = 4
}

export enum TradeAssetDirection {
  SENT = 'sent',
  RECEIVED = 'received'
}

export type BaseTradeAsset = {
  assetType: TradeAssetType
  contractAddress: string
  extra: string
}

export type CollectionItemTradeAsset = BaseTradeAsset & {
  assetType: TradeAssetType.COLLECTION_ITEM
  itemId: string
}

export type ERC20TradeAsset = BaseTradeAsset & {
  assetType: TradeAssetType.ERC20
  amount: string
}

export type USDPeggedManaTradeAsset = BaseTradeAsset & {
  assetType: TradeAssetType.USD_PEGGED_MANA
  amount: string
}

export type ERC721TradeAsset = BaseTradeAsset & {
  assetType: TradeAssetType.ERC721
  tokenId: string
}

export type TradeAsset = CollectionItemTradeAsset | ERC20TradeAsset | ERC721TradeAsset | USDPeggedManaTradeAsset

export type TradeAssetWithBeneficiary = TradeAsset & {
  beneficiary: string
}

export type Trade = {
  id: string
  signature: string
  signer: string
  network: Network
  chainId: ChainId
  type: TradeType
  checks: TradeChecks
  createdAt: number
  sent: TradeAsset[]
  received: TradeAssetWithBeneficiary[]
}

export type TradeCreation = {
  signer: string
  signature: string
  network: Network
  chainId: ChainId
  type: TradeType
  checks: TradeChecks
  sent: TradeAsset[]
  received: TradeAssetWithBeneficiary[]
}

export type OnChainTradeAsset = {
  assetType: TradeAssetType
  contractAddress: string
  value: string
  extra: string
  beneficiary: string
}

export type OnChainTrade = {
  signer: string
  signature: string
  checks: TradeChecks & { allowedProof: string[] }
  sent: OnChainTradeAsset[]
  received: OnChainTradeAsset[]
}
