import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'

export type EventCreatedEvent = BaseEvent & {
  type: Events.Type.EVENT
  subType: Events.SubType.Event.EVENT_CREATED
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
  type: Events.Type.EVENT
  subType: Events.SubType.Event.EVENT_STARTS_SOON
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
  type: Events.Type.EVENT
  subType: Events.SubType.Event.EVENT_STARTED
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
  type: Events.Type.EVENT
  subType: Events.SubType.Event.EVENT_ENDED
  metadata: {
    communityId?: string
    totalAttendees: number
  }
}

export namespace EventStartedEvent {
  export const schema: JSONSchema<EventStartedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.EVENT },
      subType: { type: 'string', const: Events.SubType.Event.EVENT_STARTED },
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

  export const validate: ValidateFunction<EventStartedEvent> = generateLazyValidator(schema)
}

export namespace EventStartsSoonEvent {
  export const schema: JSONSchema<EventStartsSoonEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.EVENT },
      subType: { type: 'string', const: Events.SubType.Event.EVENT_STARTS_SOON },
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

  export const validate: ValidateFunction<EventStartsSoonEvent> = generateLazyValidator(schema)
}

export namespace EventCreatedEvent {
  export const schema: JSONSchema<EventCreatedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.EVENT },
      subType: { type: 'string', const: Events.SubType.Event.EVENT_CREATED },
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

  export const validate: ValidateFunction<EventCreatedEvent> = generateLazyValidator(schema)
}

export namespace EventEndedEvent {
  export const schema: JSONSchema<EventEndedEvent> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: Events.Type.EVENT },
      subType: { type: 'string', const: Events.SubType.Event.EVENT_ENDED },
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
  export const validate: ValidateFunction<EventEndedEvent> = generateLazyValidator(schema)
}
