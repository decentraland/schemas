import { ChainId } from './chain-id'
import { Network } from './network'

export enum TradeType {
  BID = 'bid',
  PUBLIC_ORDER = 'public_order'
}

export type TradeExternalCheck = {
  contractAddress: string
  selector: string
  value: string
  required: boolean
}

export type TradeChecks = {
  uses: number
  expiration: number
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
  ERC721 = 2,
  COLLECTION_ITEM = 3
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

export type ERC721TradeAsset = BaseTradeAsset & {
  assetType: TradeAssetType.ERC721
  tokenId: string
}

export type TradeAsset = CollectionItemTradeAsset | ERC20TradeAsset | ERC721TradeAsset

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
