import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../validation'

export enum WearableGender {
  MALE = 'male',
  FEMALE = 'female'
}

enum UnisexOption {
  UNISEX = 'unisex'
}

export type GenderFilterOption = WearableGender | UnisexOption

export namespace WearableGender {
  export const schema: JSONSchema<WearableGender> = {
    type: 'string',
    enum: Object.values(WearableGender)
  }

  export const validate: ValidateFunction<WearableGender> =
    generateLazyValidator(schema)
}
