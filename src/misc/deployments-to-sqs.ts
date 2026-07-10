import { JSONSchema, generateLazyValidator, ValidateFunction } from '../validation'
import { EntityType } from '../platform/entity'
import { AuthChain } from './auth-chain'

/**
 * @public
 */
export type DeploymentToSqs = {
  entity: {
    entityId: string
    entityType: EntityType
    pointers: string[]
    authChain: AuthChain
  }
  lods?: string[]
  contentServerUrls?: string[]
  force?: boolean
  animation?: string
  doISS?: boolean
}

/**
 * @public
 */
export namespace DeploymentToSqs {
  export const schema: JSONSchema<DeploymentToSqs> = {
    type: 'object',
    required: ['entity'],
    properties: {
      entity: {
        type: 'object',
        required: ['entityId', 'entityType', 'pointers', 'authChain'],
        properties: {
          entityId: { type: 'string' },
          entityType: { type: 'string', enum: Object.values(EntityType) },
          pointers: { type: 'array', items: { type: 'string', minLength: 1 }, minItems: 1 },
          authChain: AuthChain.schema
        },
        additionalProperties: true
      },
      lods: {
        type: 'array',
        items: { type: 'string' },
        nullable: true
      },
      contentServerUrls: {
        type: 'array',
        items: { type: 'string' },
        nullable: true
      },
      force: {
        type: 'boolean',
        nullable: true
      },
      animation: {
        type: 'string',
        nullable: true
      },
      doISS: {
        type: 'boolean',
        nullable: true
      }
    },
    additionalProperties: true
  }

  export const validate: ValidateFunction<DeploymentToSqs> = generateLazyValidator(schema)
}
