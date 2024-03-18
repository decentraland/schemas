import { WearableCategory } from '../item/wearable/wearable-category'
import { Color3, EthAddress, IPFSv2, WearableId } from '../../misc'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

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
  snapshots: Snapshots
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
        type: 'string'
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
        items: {
          type: 'string'
        }
      },
      forceRender: {
        type: 'array',
        nullable: true,
        items: WearableCategory.schema
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
      snapshots: Snapshots.schema
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
        type: 'string'
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
        type: 'string'
      },
      name: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      links: {
        type: 'array',
        maxItems: 5,
        items: Link.schema,
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
      ethAddress: EthAddress.schema,
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
      avatar: AvatarInfo.schema
    },
    additionalProperties: true
  }
  export const validate: ValidateFunction<Avatar> = generateLazyValidator(schema)
}
