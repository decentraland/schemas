import { ChainId } from './chain-id'
import { Network } from './network'

export enum TradeType {
  BID = 'bid',
  PUBLIC_ORDER = 'public_order'
}

export type TradeExternalCheck = {
  contractAddress: string
  selector: string
  value: number
  required: boolean
}

export type TradeChecks = {
  uses: number
  expiration: number
  effective: number
  salt: number
  contractSignatureIndex: number
  signerSignatureIndex: number
  allowedRoot: string
  allowedProof?: string[]
  externalChecks: TradeExternalCheck[]
}

export enum TradeAssetType {
  ERC20 = 1,
  ERC721 = 2,
  COLLECTION_ITEM = 3,
  ERC20_WITH_FEES = 4
}

export type TradeAsset = {
  assetType: TradeAssetType
  contractAddress: string
  value: number
  extra: string
}

export type TradeAssetWithBeneficiary = TradeAsset & {
  beneficiary: string
}

export type Trade = {
  id: string
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
