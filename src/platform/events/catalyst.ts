import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { Entity } from '../entity'
import { BaseEvent, Events } from './base'

export type CatalystDeploymentEvent = BaseEvent & {
  type: Events.Type.CATALYST_DEPLOYMENT
  subType: Events.SubType.CatalystDeployment
  entity: Entity
  contentServerUrls?: string[]
  lods?: string[]
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
      contentServerUrls: { type: 'array', items: { type: 'string' }, nullable: true },
      lods: { type: 'array', items: { type: 'string' }, nullable: true }
    },
    required: ['type', 'subType', 'entity', 'key', 'timestamp'],
    additionalProperties: true // to admit .lods property for lods-generator
  }

  export const validate: ValidateFunction<CatalystDeploymentEvent> = generateLazyValidator(schema)
}
