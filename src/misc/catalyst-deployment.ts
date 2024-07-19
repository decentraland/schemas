import { JSONSchema, generateLazyValidator, ValidateFunction } from '../validation'
import { AuthChain } from './auth-chain'

export type CatalystDeployment = {
  entity: {
    entityId: string
    entityType: string
    authChain: AuthChain
    metadata?: any
  }
}

export namespace CatalystDeployment {
  export const schema: JSONSchema<CatalystDeployment> = {
    type: 'object',
    required: ['entity'],
    properties: {
      entity: {
        type: 'object',
        required: ['entityId', 'entityType', 'authChain'],
        properties: {
          entityId: { type: 'string' },
          entityType: { type: 'string' },
          authChain: AuthChain.schema,
          metadata: { type: 'object', additionalProperties: true, nullable: true }
        },
        additionalProperties: true
      }
    },
    additionalProperties: true
  }

  export const validate: ValidateFunction<CatalystDeployment> = generateLazyValidator(schema)
}
