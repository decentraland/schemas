import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'
import { createEventSchema } from './utils'

type ReferralMetadata = {
  title: string
  description: string
  position: string
  worldName: string | null
  isWorld: boolean
  url: string
  address: string
  image: string
}

const referralMetadataSchema: JSONSchema<ReferralMetadata> = {
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

export type ReferralInvitedUsersAcceptedEvent = BaseEvent & {
  type: Events.Type.REFERRAL
  subType: Events.SubType.Referral.REFERRAL_INVITED_USERS_ACCEPTED
  metadata: ReferralMetadata
}

export type ReferralNewTierReachedEvent = BaseEvent & {
  type: Events.Type.REFERRAL
  subType: Events.SubType.Referral.REFERRAL_NEW_TIER_REACHED
  metadata: ReferralMetadata
}

export namespace ReferralInvitedUsersAcceptedEvent {
  export const schema: JSONSchema<ReferralInvitedUsersAcceptedEvent> = createEventSchema(
    Events.Type.REFERRAL,
    Events.SubType.Referral.REFERRAL_INVITED_USERS_ACCEPTED,
    referralMetadataSchema
  )
  export const validate: ValidateFunction<ReferralInvitedUsersAcceptedEvent> = generateLazyValidator(schema)
}

export namespace ReferralNewTierReachedEvent {
  export const schema: JSONSchema<ReferralNewTierReachedEvent> = createEventSchema(
    Events.Type.REFERRAL,
    Events.SubType.Referral.REFERRAL_NEW_TIER_REACHED,
    referralMetadataSchema
  )
  export const validate: ValidateFunction<ReferralNewTierReachedEvent> = generateLazyValidator(schema)
}
