import {
  JSONSchema,
  generateLazyValidator,
  ValidateFunction
} from '../validation'
import { AuthChain } from "./auth-chain";

/**
 * @public
 */
export type DeploymentToSqs = {
  entity: Entity
  baseUrls?: string[]
}

/**
 * @public
 */
export type Entity = {
  entityId: string
  authChain: AuthChain
}

/**
 * @public
 */
export namespace Entity {
  export const schema: JSONSchema<Entity> = {
    type: 'object',
    required: [
      'entityId',
      'authChain',
    ],
    properties: {
      entityId: { type: 'string' },
      authChain: AuthChain.schema
    },
    additionalProperties: true
  }
}

/**
 * @public
 */
export namespace DeploymentToSqs {
  export const schema: JSONSchema<DeploymentToSqs> = {
    type: 'object',
    required: ['entity'],
    properties: {
      entity: Entity.schema,
      baseUrls:  { type: 'array', items: { type: 'string' } }
    },
    additionalProperties: true
  }

  export const validate: ValidateFunction<DeploymentToSqs> =
    generateLazyValidator(schema)
}
