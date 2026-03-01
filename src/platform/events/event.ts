import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeEvent } from './base.js'

export type EventCreatedEvent = BaseEvent & {
  type: EventType.EVENT
  subType: EventSubTypeEvent.EVENT_CREATED
  metadata: {
    title: string
    description: string
    name: string
    image: string
    communityId: string
    communityName: string
    communityThumbnail?: string
    attendee: string
  }
}

export type EventStartsSoonEvent = BaseEvent & {
  type: EventType.EVENT
  subType: EventSubTypeEvent.EVENT_STARTS_SOON
  metadata: {
    name: string
    image: string
    link: string
    startsAt: string
    endsAt: string
    title: string
    description: string
    attendee: string
  }
}

export type EventStartedEvent = BaseEvent & {
  type: EventType.EVENT
  subType: EventSubTypeEvent.EVENT_STARTED
  metadata: {
    name: string
    image: string
    link: string
    communityId: string
    communityThumbnail?: string
    title: string
    description: string
    attendee: string
  }
}

export type EventEndedEvent = BaseEvent & {
  type: EventType.EVENT
  subType: EventSubTypeEvent.EVENT_ENDED
  metadata: {
    communityId?: string
    totalAttendees: number
  }
}

export const eventStartedEventSchema: JSONSchema<EventStartedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.EVENT },
    subType: { type: 'string', const: EventSubTypeEvent.EVENT_STARTED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        image: { type: 'string' },
        link: { type: 'string' },
        communityId: { type: 'string' },
        communityThumbnail: { type: 'string', nullable: true },
        title: { type: 'string' },
        description: { type: 'string' },
        attendee: { type: 'string' }
      },
      required: ['name', 'image', 'link'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const eventStartsSoonEventSchema: JSONSchema<EventStartsSoonEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.EVENT },
    subType: { type: 'string', const: EventSubTypeEvent.EVENT_STARTS_SOON },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        image: { type: 'string' },
        link: { type: 'string' },
        startsAt: { type: 'string' },
        endsAt: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        attendee: { type: 'string' }
      },
      required: ['name', 'image', 'link', 'startsAt', 'endsAt'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const eventCreatedEventSchema: JSONSchema<EventCreatedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.EVENT },
    subType: { type: 'string', const: EventSubTypeEvent.EVENT_CREATED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        image: { type: 'string' },
        communityId: { type: 'string' },
        communityName: { type: 'string' },
        communityThumbnail: { type: 'string', nullable: true },
        title: { type: 'string' },
        description: { type: 'string' },
        attendee: { type: 'string' }
      },
      required: ['name', 'image'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}

export const eventEndedEventSchema: JSONSchema<EventEndedEvent> = {
  type: 'object',
  properties: {
    type: { type: 'string', const: EventType.EVENT },
    subType: { type: 'string', const: EventSubTypeEvent.EVENT_ENDED },
    key: { type: 'string' },
    timestamp: { type: 'number', minimum: 0 },
    metadata: {
      type: 'object',
      properties: {
        communityId: { type: 'string', nullable: true },
        totalAttendees: { type: 'number' }
      },
      required: ['totalAttendees'],
      additionalProperties: false
    }
  },
  required: ['type', 'subType', 'key', 'timestamp', 'metadata'],
  additionalProperties: false
}
