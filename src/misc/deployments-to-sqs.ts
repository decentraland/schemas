import type { JSONSchema } from '../validation/types.js'
import { AuthChain, authChainSchema } from './auth-chain.js'

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
  doISS?: boolean
}

/**
 * @public
 */
export const deploymentToSqsSchema: JSONSchema<DeploymentToSqs> = {
  type: 'object',
  required: ['entity'],
  properties: {
    entity: {
      type: 'object',
      required: ['entityId', 'authChain'],
      properties: {
        entityId: { type: 'string' },
        authChain: authChainSchema
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
