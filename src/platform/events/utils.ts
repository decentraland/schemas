import { JSONSchema } from '../../validation'
import { BaseEvent } from './base'

type BaseEventWithMetadata<M> = BaseEvent & {
  metadata: M
}

export function createEventSchema<T extends BaseEventWithMetadata<M>, M>(
  type: string,
  subType: string,
  metadataSchema: JSONSchema<M>
): JSONSchema<T> {
  return {
    type: 'object',
    properties: {
      type: { type: 'string', const: type },
      subType: { type: 'string', const: subType },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: metadataSchema
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  } as JSONSchema<T>
}
