import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type TransferReceivedEvent = BaseEvent & {
  type: Events.Type.TRANSFER
  subType: Events.SubType.Transfer.TRANSFER_RECEIVED
  metadata: {
    from: string
    to: string
    itemName: string
  }
}

export namespace TransferReceivedEvent {
  export const schema: JSONSchema<TransferReceivedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.TRANSFER },
      subType: { type: 'string', const: Events.SubType.Transfer.TRANSFER_RECEIVED },
      key: { type: 'string' },
      timestamp: { type: 'number', minimum: 0 },
      metadata: {
        type: 'object',
        properties: {
          from: { type: 'string' },
          to: { type: 'string' },
          itemName: { type: 'string' }
        },
        required: ['from', 'to', 'itemName'],
        additionalProperties: false
      }
    },
    required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<TransferReceivedEvent> = generateLazyValidator(schema)
}
