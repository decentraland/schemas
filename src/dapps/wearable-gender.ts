import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export enum WearableGender {
  MALE = 'male',
  FEMALE = 'female'
}

export enum GenderFilterOption {
  MALE = 'male',
  FEMALE = 'female',
  UNISEX = 'unisex'
}

export namespace WearableGender {
  export const schema: JSONSchema<WearableGender> = {
    type: 'string',
    enum: Object.values(WearableGender)
  }

  export const validate: ValidateFunction<WearableGender> = generateLazyValidator(schema)
}
