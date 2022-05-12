import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @public */
export enum ProjectType {
  SCENE = 'scene',
  SMART_ITEM = 'smart-item',
  PORTABLE_EXPERIENCE = 'portable-experience',
  SMART_WEARABLE = 'smart-wearable',
  LIBRARY = 'library'
}

/** @public */
export namespace ProjectType {
  export const schema: JSONSchema<ProjectType> = {
    type: 'string',
    enum: Object.values(ProjectType)
  }

  export const validate: ValidateFunction<ProjectType> =
    generateValidator(schema)
}
