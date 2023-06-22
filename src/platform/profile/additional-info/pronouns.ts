import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum Pronouns {
  HE = 'He / Him',
  SHE = 'She / Her',
  THEY = 'They / Them',
  ZIR = 'Ze / Zir',
  XE = 'Xe / Xem',
  HIR = 'Ze / Hir',
  PER = 'Per / Per',
  OTHER = 'Other'
}

export namespace Pronouns {
  export const schema: JSONSchema<Pronouns> = {
    type: 'string',
    enum: Object.values(Pronouns),
    nullable: true
  }
  export const validate: ValidateFunction<Pronouns> = generateLazyValidator(schema)
}
