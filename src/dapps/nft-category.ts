import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export enum NFTCategory {
  PARCEL = 'parcel',
  ESTATE = 'estate',
  WEARABLE = 'wearable',
  ENS = 'ens',
  EMOTE = 'emote'
}

export namespace NFTCategory {
  export const schema: JSONSchema<NFTCategory> = {
    type: 'string',
    enum: Object.values(NFTCategory)
  }

  export const validate: ValidateFunction<NFTCategory> = generateLazyValidator(schema)
}
