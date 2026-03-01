import type { JSONSchema } from '../validation/types.js'

export enum NFTCategory {
  PARCEL = 'parcel',
  ESTATE = 'estate',
  WEARABLE = 'wearable',
  ENS = 'ens',
  EMOTE = 'emote'
}

export const nftCategorySchema: JSONSchema<NFTCategory> = {
  type: 'string',
  enum: Object.values(NFTCategory)
}
