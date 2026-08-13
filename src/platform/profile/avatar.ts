import { WearableCategory } from '../item/wearable/wearable-category'
import { Color3, EthAddress, IPFSv2, WearableId } from '../../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/**
 * Bounds for the free-form avatar properties.
 *
 * A profile's metadata was previously unbounded in every direction: no string had a maximum
 * length and no array had a maximum length either, so a single entry could carry megabytes.
 * These limits are applied to already-deployed profiles whenever a node re-validates historical
 * content, so each one is set well above the largest value real profiles are expected to hold
 * rather than at the tightest value that would work.
 */
/** Longest accepted URN. The longest linked-wearable form is comfortably under this. */
const URN_MAX_LENGTH = 256
/** Equipped wearables, one per category, plus generous headroom. */
const MAX_WEARABLES = 200
/** `forceRender` holds wearable categories, so it is already bounded by that enum. */
const MAX_FORCE_RENDER = 32
/** Emote slots are validated to 0-9 elsewhere; this only bounds the array itself. */
const MAX_EMOTES = 100
/** A display name, not prose. */
const NAME_MAX_LENGTH = 256
/** A user-written bio. */
const DESCRIPTION_MAX_LENGTH = 10000
/** Short free-form profile fields such as `country`, `pronouns` or `profession`. */
const SHORT_TEXT_MAX_LENGTH = 256
/** The longest address an RFC 5321 mailbox may hold. */
const EMAIL_MAX_LENGTH = 320
/**
 * A user id is an ethereum address. The pattern also accepts the empty string, which is what the
 * deployed `defaultN` profiles carry, so constraining the field does not reject them.
 */
const USER_ID_PATTERN = '^(0x[a-fA-F0-9]{40})?$'
/** `blocked` and `muted` hold user ids, so an entry is at most an address. */
const ETH_ADDRESS_MAX_LENGTH = 42
/**
 * `blocked` and `muted` grow with ordinary use, so this is set far above any observed list rather
 * than at the tightest workable value: no profile in a sample of recent deployments held a single
 * entry in either.
 */
const MAX_BLOCKED_OR_MUTED = 5000
/** One entry of `interests`. */
const LIST_ENTRY_MAX_LENGTH = 128
const MAX_INTERESTS = 100

/**
 * Snapshots
 * @alpha
 */
export type Snapshots = {
  face256: IPFSv2
  body: IPFSv2
}

/**
 * Snapshots
 * @alpha
 */
export namespace Snapshots {
  export const schema: JSONSchema<Snapshots> = {
    type: 'object',
    required: ['face256', 'body'],
    properties: {
      face256: IPFSv2.schema,
      body: IPFSv2.schema
    }
  }
  export const validate: ValidateFunction<Snapshots> = generateLazyValidator(schema)
}

/**
 * AvatarInfo
 * @alpha
 */
export type AvatarInfo = {
  bodyShape: WearableId
  eyes: { color: Color3 }
  hair: { color: Color3 }
  skin: { color: Color3 }
  wearables: WearableId[]
  forceRender?: WearableCategory[]
  // emotes must be present after ADR 74
  emotes?: {
    slot: number
    urn: string
  }[]
  snapshots?: Snapshots
}

/**
 * AvatarInfo
 * @alpha
 */
export namespace AvatarInfo {
  export const schema: JSONSchema<AvatarInfo> = {
    type: 'object',
    required: ['bodyShape', 'eyes', 'hair', 'skin'],
    properties: {
      bodyShape: {
        type: 'string',
        maxLength: URN_MAX_LENGTH
      },
      eyes: {
        type: 'object',
        required: ['color'],
        properties: {
          color: Color3.schema
        }
      },
      hair: {
        type: 'object',
        required: ['color'],
        properties: {
          color: Color3.schema
        }
      },
      skin: {
        type: 'object',
        required: ['color'],
        properties: {
          color: Color3.schema
        }
      },
      wearables: {
        type: 'array',
        maxItems: MAX_WEARABLES,
        items: {
          type: 'string',
          maxLength: URN_MAX_LENGTH
        }
      },
      forceRender: {
        type: 'array',
        nullable: true,
        maxItems: MAX_FORCE_RENDER,
        items: WearableCategory.schema
      },
      emotes: {
        type: 'array',
        maxItems: MAX_EMOTES,
        items: {
          type: 'object',
          properties: {
            slot: { type: 'number' },
            urn: { type: 'string', maxLength: URN_MAX_LENGTH }
          },
          required: ['slot', 'urn']
        },
        nullable: true
      },
      snapshots: {
        ...Snapshots.schema,
        nullable: true
      }
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<AvatarInfo> = generateLazyValidator(schema)
}

/**
 * LinkUrl
 * @alpha
 */
export type LinkUrl = string

/**
 * LinkUrl
 * @alpha
 */
export namespace LinkUrl {
  export const schema: JSONSchema<LinkUrl> = {
    type: 'string',
    maxLength: 2083,
    pattern: '^(?:https?):\\/\\/[^\\s/$.?#].[^\\s]*$'
  }
  const regexp = new RegExp(schema.pattern!, 'i')
  export const validate: ValidateFunction<LinkUrl> = (url: any): url is LinkUrl => regexp.test(url)
}

/**
 * Link
 * @alpha
 */
export type Link = {
  title: string
  url: LinkUrl
}

/**
 * Link
 * @alpha
 */
export namespace Link {
  export const schema: JSONSchema<Link> = {
    type: 'object',
    required: ['title', 'url'],
    properties: {
      title: {
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      url: LinkUrl.schema
    }
  }
}

/**
 * Avatar represents a profile avatar. Used both for comms, internal state of the
 * explorer and the deployed profiles.
 * @alpha
 */
export type Avatar = {
  userId: string
  name: string
  nameColor?: Color3
  description: string
  links?: Link[]
  country?: string
  employmentStatus?: string
  gender?: string
  pronouns?: string
  relationshipStatus?: string
  sexualOrientation?: string
  language?: string
  profession?: string
  birthdate?: number
  realName?: string
  hobbies?: string
  ethAddress: EthAddress
  version: number
  tutorialStep: number
  email?: string
  blocked?: string[]
  muted?: string[]
  interests?: string[]
  hasClaimedName: boolean
  avatar: AvatarInfo
  /**
   * Whether the player has connected web3 wallet or is a guest user.
   * This is always true for deployed profiles.
   */
  hasConnectedWeb3?: boolean
}

/**
 * Avatar
 * @alpha
 */
export namespace Avatar {
  export const schema: JSONSchema<Avatar> = {
    type: 'object',
    required: ['name', 'description', 'ethAddress', 'version', 'tutorialStep', 'avatar', 'hasClaimedName'],
    properties: {
      userId: {
        type: 'string',
        pattern: USER_ID_PATTERN
      },
      name: {
        type: 'string',
        maxLength: NAME_MAX_LENGTH
      },
      nameColor: {
        ...Color3.schema,
        nullable: true
      },
      description: {
        type: 'string',
        maxLength: DESCRIPTION_MAX_LENGTH
      },
      links: {
        type: 'array',
        maxItems: 5,
        items: Link.schema,
        nullable: true
      },
      country: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      employmentStatus: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      gender: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      pronouns: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      relationshipStatus: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      sexualOrientation: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      language: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      profession: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      birthdate: {
        nullable: true,
        type: 'number'
      },
      realName: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      hobbies: {
        nullable: true,
        type: 'string',
        maxLength: SHORT_TEXT_MAX_LENGTH
      },
      ethAddress: EthAddress.schema,
      version: {
        type: 'number'
      },
      tutorialStep: {
        type: 'number'
      },
      email: {
        type: 'string',
        nullable: true,
        maxLength: EMAIL_MAX_LENGTH
      },
      blocked: {
        type: 'array',
        maxItems: MAX_BLOCKED_OR_MUTED,
        items: {
          type: 'string',
          maxLength: ETH_ADDRESS_MAX_LENGTH
        },
        nullable: true
      },
      muted: {
        type: 'array',
        maxItems: MAX_BLOCKED_OR_MUTED,
        items: {
          type: 'string',
          maxLength: ETH_ADDRESS_MAX_LENGTH
        },
        nullable: true
      },
      interests: {
        type: 'array',
        maxItems: MAX_INTERESTS,
        items: {
          type: 'string',
          maxLength: LIST_ENTRY_MAX_LENGTH
        },
        nullable: true
      },
      hasClaimedName: {
        type: 'boolean'
      },
      hasConnectedWeb3: {
        type: 'boolean',
        nullable: true
      },
      avatar: AvatarInfo.schema
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Avatar> = generateLazyValidator(schema)
}
