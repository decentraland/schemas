import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum Gender {
  FEMALE = 'Female',
  MALE = 'Male',
  TRANSGENDER = 'Transgender',
  NEUTRAL = 'Neutral',
  NON_BINARY = 'Non-Binary',
  FLUID = 'Fluid',
  AGENGER = 'Agender',
  PANGENDER = 'Pangender',
  QUEER = 'Queer',
  TWO_SPIRIT = 'Two-Spirit',
  OTHER = 'Other'
}

export namespace Gender {
  export const schema: JSONSchema<Gender> = {
    type: 'string',
    enum: Object.values(Gender),
    default: Gender.NONE
  }
  export const validate: ValidateFunction<Gender> = generateLazyValidator(schema)
}
