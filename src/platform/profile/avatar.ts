import { WearableCategory } from '../../dapps/wearable-category'
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
 * Avatar represents a profile avatar. Used both for comms, internal state of the
 * explorer and the deployed profiles.
 * @alpha
 */
export type Avatar = {
  userId: string
  name: string
  description: string
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
   * Whether or not the player has connected web3 wallet or is a guest user.
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
    required: ['name', 'description', 'ethAddress', 'version', 'tutorialStep', 'avatar'],
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
        type: 'boolean',
        nullable: true
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
