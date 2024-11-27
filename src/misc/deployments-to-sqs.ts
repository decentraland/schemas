import { JSONSchema, generateLazyValidator, ValidateFunction } from '../validation'
import { AuthChain } from './auth-chain'

/**
 * @public
 */
export type DeploymentToSqs = {
  entity: {
    entityId: string
    authChain: AuthChain
  }
  lods?: string[]
  contentServerUrls?: string[]
  force?: boolean
  animation?: string
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
        required: ['entityId', 'authChain'],
        properties: {
          entityId: { type: 'string' },
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
      }
    },
    additionalProperties: true
  }

  export const validate: ValidateFunction<DeploymentToSqs> = generateLazyValidator(schema)
}
