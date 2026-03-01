import type { JSONSchema } from '../validation/types.js'
import { AuthChain, authChainSchema } from './auth-chain.js'

export type CatalystDeployment = {
  entity: {
    entityId: string
    entityType: string
    authChain: AuthChain
    metadata?: any
  }
}

export const catalystDeploymentSchema: JSONSchema<CatalystDeployment> = {
  type: 'object',
  required: ['entity'],
  properties: {
    entity: {
      type: 'object',
      required: ['entityId', 'entityType', 'authChain'],
      properties: {
        entityId: { type: 'string' },
        entityType: { type: 'string' },
        authChain: authChainSchema,
        metadata: { type: 'object', additionalProperties: true, nullable: true }
      },
      additionalProperties: true
    }
  },
  additionalProperties: true
}
