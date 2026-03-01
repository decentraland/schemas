import { AuthChain, authChainSchema } from '../../misc/auth-chain.js'
import type { JSONSchema } from '../../validation/types.js'
import { Entity, entitySchema } from '../entity.js'
import { BaseEvent, EventType, EventSubTypeCatalystDeployment } from './base.js'

export type CatalystDeploymentEvent = BaseEvent & {
  type: EventType.CATALYST_DEPLOYMENT
  subType: EventSubTypeCatalystDeployment
  entity: Entity
  authChain: AuthChain
}

export const catalystDeploymentEventSchema: JSONSchema<CatalystDeploymentEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.CATALYST_DEPLOYMENT },
    subType: {
      type: 'string',
      enum: Object.values(EventSubTypeCatalystDeployment)
    },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 1 },
    entity: entitySchema,
    authChain: authChainSchema
  },
  required: ['type', 'subType', 'entity', 'authChain', 'key', 'timestamp'],
  additionalProperties: false
}
