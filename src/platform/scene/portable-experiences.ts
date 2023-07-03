import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export enum PermissionItem {
  PI_ALLOW = 'allow',
  PI_KILL = 'kill',
  PI_HIDE_UI = 'hideUi'
}

/**
 * Configuration for Portable Experiences
 *
 * @alpha
 */
export type PortableExperiences = {
  permission?: PermissionItem
}

/** @alpha */
export namespace PortableExperiences {
  export const schema: JSONSchema<PortableExperiences> = {
    type: 'object',
    properties: {
      permission: {
        type: 'string',
        enum: Object.values(PermissionItem),
        nullable: true
      }
    }
  }

  export const validate: ValidateFunction<PortableExperiences> = generateLazyValidator(schema)
}
