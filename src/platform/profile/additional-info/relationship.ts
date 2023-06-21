import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum RelationshipStatus {
  SINGLE = 'Single',
  RELATIONSHIP = 'In a relationship',
  ENGAGED = 'Engaged',
  MARRIED = 'Married',
  COMPLICATED = "It's complicated",
  OPEN_RELATIONSHIP = 'In an open relationship',
  WIDOWED = 'Widowed',
  SEPARATED = 'Separated',
  DIVORCED = 'Divorced',
  OTHER = 'Other',
  NONE = 'None'
}

export namespace RelationshipStatus {
  export const schema: JSONSchema<RelationshipStatus> = {
    type: 'string',
    enum: Object.values(RelationshipStatus),
    default: RelationshipStatus.NONE
  }
  export const validate: ValidateFunction<RelationshipStatus> = generateLazyValidator(schema)
}
