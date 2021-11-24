import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

export enum WearableGender {
  MALE = 'male',
  FEMALE = 'female'
}

export namespace WearableGender {
  export const schema: JSONSchema<WearableGender> = {
    type: 'string',
    enum: Object.values(WearableGender)
  }

  export const validate: ValidateFunction<WearableGender> =
    generateValidator(schema)
}
