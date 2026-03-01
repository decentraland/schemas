import type { JSONSchema } from '../../validation/types.js'

/** @public */
export enum ProjectType {
  SCENE = 'scene',
  SMART_ITEM = 'smart-item',
  PORTABLE_EXPERIENCE = 'portable-experience',
  LIBRARY = 'library'
}

/** @public */
export const projectTypeSchema: JSONSchema<ProjectType> = {
  type: 'string',
  enum: Object.values(ProjectType)
}
