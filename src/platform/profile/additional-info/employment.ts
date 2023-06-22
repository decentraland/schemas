import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum EmploymentStatus {
  STUDYING = 'Studying',
  WORKING = 'Working',
  CHILLING = 'Chilling',
  LOOKING_FOR_JOB = 'Looking for job',
  HOME_FAMILY = 'Home/Family',
  RETIRED = 'Retired',
  OTHER = 'Other'
}

export namespace EmploymentStatus {
  export const schema: JSONSchema<EmploymentStatus> = {
    type: 'string',
    enum: Object.values(EmploymentStatus),
    nullable: true
  }
  export const validate: ValidateFunction<EmploymentStatus> = generateLazyValidator(schema)
}
