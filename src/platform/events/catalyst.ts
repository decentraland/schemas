import { AuthChain } from '../../misc/auth-chain'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { Entity } from '../entity'
import { BaseEvent, Events } from './base'

export type CatalystDeploymentEvent = BaseEvent & {
  type: Events.Type.CATALYST_DEPLOYMENT
  subType: Events.SubType.CatalystDeployment
  entity: Entity
  authChain: AuthChain
}

export namespace CatalystDeploymentEvent {
  export const schema: JSONSchema<CatalystDeploymentEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.CATALYST_DEPLOYMENT },
      subType: {
        type: 'string',
        enum: Object.values(Events.SubType.CatalystDeployment)
      },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 1 },
      entity: Entity.schema,
      authChain: AuthChain.schema
    },
    required: ['type', 'subType', 'entity', 'authChain', 'key', 'timestamp'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<CatalystDeploymentEvent> = generateLazyValidator(schema)
}
