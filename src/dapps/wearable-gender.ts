import type { JSONSchema } from '../validation/types.js'

export enum WearableGender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum GenderFilterOption {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}

export const wearableGenderSchema: JSONSchema<WearableGender> = {
  type: 'string',
  enum: Object.values(WearableGender)
}
