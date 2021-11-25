import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

export enum AssetWearableGender {
  MALE = 'male',
  FEMALE = 'female',
  BOTH = 'both'
}

export namespace AssetWearableGender {
  export const schema: JSONSchema<AssetWearableGender> = {
    type: 'string',
    enum: Object.values(AssetWearableGender)
  }

  export const validate: ValidateFunction<AssetWearableGender> =
    generateValidator(schema)
}
