import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'
import { createEventSchema } from './utils'

type ReferralMetadata = {
  title: string
  description: string
  address: string
  tier: number
  url: string
  image: string
  invitedUserAddress: string
  invitedUsers: number
  rarity: string | null
}

const referralMetadataSchema: JSONSchema<ReferralMetadata> = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    address: { type: 'string' },
    tier: { type: 'number', minimum: 1 },
    url: { type: 'string' },
    image: { type: 'string' },
    invitedUserAddress: { type: 'string' },
    invitedUsers: { type: 'number', minimum: 1 },
    rarity: { type: 'string', nullable: true }
  },
  required: ['address', 'tier', 'url', 'title', 'description', 'image', 'invitedUserAddress'],
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
