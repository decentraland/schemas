import { AuthChain, authChainSchema } from '../misc/auth-chain.js'
import type { JSONSchema } from '../validation/types.js'

/**
 * This type describes the minimum deployment + AuthChain needed to synchronize
 * a deployed entity across catalysts.
 * @public @deprecated
 */
export type DeploymentWithAuthChain = {
  entityId: string
  entityType: string
  pointers: string[]
  localTimestamp: number
  authChain: AuthChain
}

/**
 * @public
 * @deprecated use SyncDeployment instead
 */
export const deploymentWithAuthChainSchema: JSONSchema<DeploymentWithAuthChain> = {
  type: 'object',
  properties: {
    entityId: { type: 'string' },
    entityType: { type: 'string' },
    pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
    localTimestamp: { type: 'number', minimum: 0 },
    authChain: authChainSchema
  },
  required: ['entityId', 'entityType', 'pointers', 'localTimestamp', 'authChain']
}
