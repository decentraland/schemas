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
export type PortableExperience = {
  permission?: PermissionItem
}

/** @alpha */
export namespace PortableExperience {
  export const schema: JSONSchema<PortableExperience> = {
    type: 'object',
    properties: {
      permission: {
        type: 'string',
        enum: Object.values(PermissionItem),
        nullable: true,
        errorMessage: `permission should be one of: ${Object.values(PermissionItem).join(', ')}`
      }
    }
  }

  export const validate: ValidateFunction<PortableExperience> = generateLazyValidator(schema)
}
