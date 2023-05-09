import { AuthChain } from '../misc/auth-chain'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

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
export namespace DeploymentWithAuthChain {
  export const schema: JSONSchema<DeploymentWithAuthChain> = {
    type: 'object',
    properties: {
      entityId: { type: 'string' },
      entityType: { type: 'string' },
      pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
      localTimestamp: { type: 'number', minimum: 0 },
      authChain: AuthChain.schema
    },
    required: ['entityId', 'entityType', 'pointers', 'localTimestamp', 'authChain']
  }

  export const validate: ValidateFunction<DeploymentWithAuthChain> = generateLazyValidator(schema)
}
