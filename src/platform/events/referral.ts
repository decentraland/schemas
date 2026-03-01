import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeReferral } from './base.js'
import { createEventSchema } from './utils.js'

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
  type: EventType.REFERRAL
  subType: EventSubTypeReferral.REFERRAL_INVITED_USERS_ACCEPTED
  metadata: ReferralMetadata
}

export type ReferralNewTierReachedEvent = BaseEvent & {
  type: EventType.REFERRAL
  subType: EventSubTypeReferral.REFERRAL_NEW_TIER_REACHED
  metadata: ReferralMetadata
}

export const referralInvitedUsersAcceptedEventSchema: JSONSchema<ReferralInvitedUsersAcceptedEvent> = createEventSchema(
  EventType.REFERRAL,
  EventSubTypeReferral.REFERRAL_INVITED_USERS_ACCEPTED,
  referralMetadataSchema
)

export const referralNewTierReachedEventSchema: JSONSchema<ReferralNewTierReachedEvent> = createEventSchema(
  EventType.REFERRAL,
  EventSubTypeReferral.REFERRAL_NEW_TIER_REACHED,
  referralMetadataSchema
)
