import { AuthChain } from '../misc/auth-chain'
import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../validation'

/**
 * This type describes the minimum deployment + AuthChain needed to synchronize
 * a deployed entity across catalysts.
 * @public
 */
export type DeploymentWithAuthChain = {
  entityId: string
  entityType: string
  pointers: string[]
  entityTimestamp?: number
  localTimestamp?: number
  authChain: AuthChain
}

/**
 * @public
 */
export namespace DeploymentWithAuthChain {
  export const schema: JSONSchema<DeploymentWithAuthChain> = {
    type: 'object',
    properties: {
      entityId: { type: 'string' },
      entityType: { type: 'string' },
      pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
      entityTimestamp: { type: 'number', minimum: 0, nullable: true },
      localTimestamp: { type: 'number', minimum: 0, nullable: true },
      authChain: AuthChain.schema
    },
    required: ['entityId', 'entityType', 'pointers', 'authChain']
  }

  export const validate: ValidateFunction<DeploymentWithAuthChain> =
    generateLazyValidator(schema)
}
