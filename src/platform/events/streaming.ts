import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'
import { createEventSchema } from './utils'

type StreamingMetadata = {
  title: string
  description: string
  position: string
  worldName: string | null
  isWorld: boolean
  url: string
  address: string
  image: string
}

const streamingMetadataSchema: JSONSchema<StreamingMetadata> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    position: { type: 'string' },
    worldName: { type: 'string', nullable: true },
    isWorld: { type: 'boolean' },
    url: { type: 'string' },
    address: { type: 'string' },
    image: { type: 'string' }
  },
  required: ['position', 'isWorld', 'url', 'title', 'description', 'address', 'image'],
  additionalProperties: false
}

export type StreamingKeyResetEvent = BaseEvent & {
  type: Events.Type.STREAMING
  subType: Events.SubType.Streaming.STREAMING_KEY_RESET
  metadata: StreamingMetadata
}

export type StreamingKeyRevokeEvent = BaseEvent & {
  type: Events.Type.STREAMING
  subType: Events.SubType.Streaming.STREAMING_KEY_REVOKE
  metadata: StreamingMetadata
}

export type StreamingKeyExpiredEvent = BaseEvent & {
  type: Events.Type.STREAMING
  subType: Events.SubType.Streaming.STREAMING_KEY_EXPIRED
  metadata: StreamingMetadata
}

export type StreamingTimeExceededEvent = BaseEvent & {
  type: Events.Type.STREAMING
  subType: Events.SubType.Streaming.STREAMING_TIME_EXCEEDED
  metadata: StreamingMetadata
}

export type StreamingPlaceUpdatedEvent = BaseEvent & {
  type: Events.Type.STREAMING
  subType: Events.SubType.Streaming.STREAMING_PLACE_UPDATED
  metadata: StreamingMetadata
}

export namespace StreamingKeyResetEvent {
  export const schema: JSONSchema<StreamingKeyResetEvent> = createEventSchema(
    Events.Type.STREAMING,
    Events.SubType.Streaming.STREAMING_KEY_RESET,
    streamingMetadataSchema
  )
  export const validate: ValidateFunction<StreamingKeyResetEvent> = generateLazyValidator(schema)
}

export namespace StreamingKeyRevokeEvent {
  export const schema: JSONSchema<StreamingKeyRevokeEvent> = createEventSchema(
    Events.Type.STREAMING,
    Events.SubType.Streaming.STREAMING_KEY_REVOKE,
    streamingMetadataSchema
  )
  export const validate: ValidateFunction<StreamingKeyRevokeEvent> = generateLazyValidator(schema)
}

export namespace StreamingKeyExpiredEvent {
  export const schema: JSONSchema<StreamingKeyExpiredEvent> = createEventSchema(
    Events.Type.STREAMING,
    Events.SubType.Streaming.STREAMING_KEY_EXPIRED,
    streamingMetadataSchema
  )
  export const validate: ValidateFunction<StreamingKeyExpiredEvent> = generateLazyValidator(schema)
}

export namespace StreamingTimeExceededEvent {
  export const schema: JSONSchema<StreamingTimeExceededEvent> = createEventSchema(
    Events.Type.STREAMING,
    Events.SubType.Streaming.STREAMING_TIME_EXCEEDED,
    streamingMetadataSchema
  )
  export const validate: ValidateFunction<StreamingTimeExceededEvent> = generateLazyValidator(schema)
}

export namespace StreamingPlaceUpdatedEvent {
  export const schema: JSONSchema<StreamingPlaceUpdatedEvent> = createEventSchema(
    Events.Type.STREAMING,
    Events.SubType.Streaming.STREAMING_PLACE_UPDATED,
    streamingMetadataSchema
  )
  export const validate: ValidateFunction<StreamingPlaceUpdatedEvent> = generateLazyValidator(schema)
}
