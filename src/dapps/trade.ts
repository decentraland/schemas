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
  allowedProof: string[]
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
  benenficiary: string
}

export type Trade = {
  signer: string
  signature: string
  checks: TradeChecks
  sent: TradeAsset
  received: TradeAsset[]
}
