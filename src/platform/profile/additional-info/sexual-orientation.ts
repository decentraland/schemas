import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum SexualOrientation {
  HETEROSEXUAL = 'Heterosexual',
  BISEXUAL = 'Bisexual',
  LESBIAN = 'Lesbian',
  GAY = 'Gay',
  ASEXUAL = 'Asexual',
  QUEER = 'Queer',
  POLYSEXUAL = 'Polysexual',
  PANSEXUAL = 'Pansexual',
  OTHER = 'Other'
}

export namespace SexualOrientation {
  export const schema: JSONSchema<SexualOrientation> = {
    type: 'string',
    enum: Object.values(SexualOrientation),
    default: SexualOrientation.NONE
  }
  export const validate: ValidateFunction<SexualOrientation> = generateLazyValidator(schema)
}
