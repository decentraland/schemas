import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

export enum BodyShape {
  MALE = 'BaseMale',
  FEMALE = 'BaseFemale'
}

export namespace BodyShape {
  export const schema: JSONSchema<BodyShape> = {
    type: 'string',
    enum: Object.values(BodyShape)
  }

  export const validate: ValidateFunction<BodyShape> = generateValidator(schema)
}
