import { WearableCategory, wearableCategorySchema } from '../item/wearable/wearable-category.js'
import {
  Color3,
  EthAddress,
  IPFSv2,
  WearableId,
  ipfsv2Schema,
  color3Schema,
  ethAddressSchema
} from '../../misc/index.js'
import type { JSONSchema } from '../../validation/types.js'

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
export const snapshotsSchema: JSONSchema<Snapshots> = {
  type: 'object',
  required: ['face256', 'body'],
  properties: {
    face256: ipfsv2Schema,
    body: ipfsv2Schema
  }
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
export const avatarInfoSchema: JSONSchema<AvatarInfo> = {
  type: 'object',
  required: ['bodyShape', 'eyes', 'hair', 'skin'],
  properties: {
    bodyShape: {
      type: 'string'
    },
    eyes: {
      type: 'object',
      required: ['color'],
      properties: {
        color: color3Schema
      }
    },
    hair: {
      type: 'object',
      required: ['color'],
      properties: {
        color: color3Schema
      }
    },
    skin: {
      type: 'object',
      required: ['color'],
      properties: {
        color: color3Schema
      }
    },
    wearables: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    forceRender: {
      type: 'array',
      nullable: true,
      items: wearableCategorySchema
    },
    emotes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          slot: { type: 'number' },
          urn: { type: 'string' }
        },
        required: ['slot', 'urn']
      },
      nullable: true
    },
    snapshots: {
      ...snapshotsSchema,
      nullable: true
    }
  },
  additionalProperties: true
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
export const linkUrlSchema: JSONSchema<LinkUrl> = {
  type: 'string',
  maxLength: 2083,
  pattern: '^(?:https?):\\/\\/[^\\s/$.?#].[^\\s]*$'
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
export const linkSchema: JSONSchema<Link> = {
  type: 'object',
  required: ['title', 'url'],
  properties: {
    title: {
      type: 'string'
    },
    url: linkUrlSchema
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
export const avatarSchema: JSONSchema<Avatar> = {
  type: 'object',
  required: ['name', 'description', 'ethAddress', 'version', 'tutorialStep', 'avatar', 'hasClaimedName'],
  properties: {
    userId: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    nameColor: {
      ...color3Schema,
      nullable: true
    },
    description: {
      type: 'string'
    },
    links: {
      type: 'array',
      maxItems: 5,
      items: linkSchema,
      nullable: true
    },
    country: {
      nullable: true,
      type: 'string'
    },
    employmentStatus: {
      nullable: true,
      type: 'string'
    },
    gender: {
      nullable: true,
      type: 'string'
    },
    pronouns: {
      nullable: true,
      type: 'string'
    },
    relationshipStatus: {
      nullable: true,
      type: 'string'
    },
    sexualOrientation: {
      nullable: true,
      type: 'string'
    },
    language: {
      nullable: true,
      type: 'string'
    },
    profession: {
      nullable: true,
      type: 'string'
    },
    birthdate: {
      nullable: true,
      type: 'number'
    },
    realName: {
      nullable: true,
      type: 'string'
    },
    hobbies: {
      nullable: true,
      type: 'string'
    },
    ethAddress: ethAddressSchema,
    version: {
      type: 'number'
    },
    tutorialStep: {
      type: 'number'
    },
    email: {
      type: 'string',
      nullable: true
    },
    blocked: {
      type: 'array',
      items: {
        type: 'string'
      },
      nullable: true
    },
    muted: {
      type: 'array',
      items: {
        type: 'string'
      },
      nullable: true
    },
    interests: {
      type: 'array',
      items: {
        type: 'string'
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
    avatar: avatarInfoSchema
  },
  additionalProperties: true
}
