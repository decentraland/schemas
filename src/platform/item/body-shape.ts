import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export enum BodyShape {
  MALE = 'urn:decentraland:off-chain:base-avatars:BaseMale',
  FEMALE = 'urn:decentraland:off-chain:base-avatars:BaseFemale'
}

/** @alpha */
export namespace BodyShape {
  export const schema: JSONSchema<BodyShape> = {
    type: 'string',
    enum: Object.values(BodyShape)
  }

  export const validate: ValidateFunction<BodyShape> = generateLazyValidator(schema)
}
