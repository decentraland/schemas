import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeStreaming } from './base.js'
import { createEventSchema } from './utils.js'

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
  type: EventType.STREAMING
  subType: EventSubTypeStreaming.STREAMING_KEY_RESET
  metadata: StreamingMetadata
}

export type StreamingKeyRevokeEvent = BaseEvent & {
  type: EventType.STREAMING
  subType: EventSubTypeStreaming.STREAMING_KEY_REVOKE
  metadata: StreamingMetadata
}

export type StreamingKeyExpiredEvent = BaseEvent & {
  type: EventType.STREAMING
  subType: EventSubTypeStreaming.STREAMING_KEY_EXPIRED
  metadata: StreamingMetadata
}

export type StreamingTimeExceededEvent = BaseEvent & {
  type: EventType.STREAMING
  subType: EventSubTypeStreaming.STREAMING_TIME_EXCEEDED
  metadata: StreamingMetadata
}

export type StreamingPlaceUpdatedEvent = BaseEvent & {
  type: EventType.STREAMING
  subType: EventSubTypeStreaming.STREAMING_PLACE_UPDATED
  metadata: StreamingMetadata
}

export type CommunityStreamingEndedEvent = BaseEvent & {
  type: EventType.STREAMING
  subType: EventSubTypeStreaming.COMMUNITY_STREAMING_ENDED
  metadata: {
    communityId: string
    totalParticipants: number
  }
}

export const streamingKeyResetEventSchema: JSONSchema<StreamingKeyResetEvent> = createEventSchema(
  EventType.STREAMING,
  EventSubTypeStreaming.STREAMING_KEY_RESET,
  streamingMetadataSchema
)

export const streamingKeyRevokeEventSchema: JSONSchema<StreamingKeyRevokeEvent> = createEventSchema(
  EventType.STREAMING,
  EventSubTypeStreaming.STREAMING_KEY_REVOKE,
  streamingMetadataSchema
)

export const streamingKeyExpiredEventSchema: JSONSchema<StreamingKeyExpiredEvent> = createEventSchema(
  EventType.STREAMING,
  EventSubTypeStreaming.STREAMING_KEY_EXPIRED,
  streamingMetadataSchema
)

export const streamingTimeExceededEventSchema: JSONSchema<StreamingTimeExceededEvent> = createEventSchema(
  EventType.STREAMING,
  EventSubTypeStreaming.STREAMING_TIME_EXCEEDED,
  streamingMetadataSchema
)

export const streamingPlaceUpdatedEventSchema: JSONSchema<StreamingPlaceUpdatedEvent> = createEventSchema(
  EventType.STREAMING,
  EventSubTypeStreaming.STREAMING_PLACE_UPDATED,
  streamingMetadataSchema
)

export const communityStreamingEndedEventSchema: JSONSchema<CommunityStreamingEndedEvent> = createEventSchema(
  EventType.STREAMING,
  EventSubTypeStreaming.COMMUNITY_STREAMING_ENDED,
  {
    type: 'object',
    properties: {
      communityId: { type: 'string' },
      totalParticipants: { type: 'number' }
    },
    required: ['communityId', 'totalParticipants'],
    additionalProperties: false
  } as JSONSchema<CommunityStreamingEndedEvent['metadata']>
)
