import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'
import { createEventSchema } from './utils'

type ReferralMetadata = {
  title: string
  description: string
  tier: string
  url: string
  image: string
  invitedUsers: string
}

const referralMetadataSchema: JSONSchema<ReferralMetadata> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    tier: { type: 'string' },
    url: { type: 'string' },
    image: { type: 'string' },
    invitedUsers: { type: 'string' }
  },
  required: ['tier', 'url', 'title', 'description', 'image', 'invitedUsers'],
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
