import { Color3, EthAddress, IPFSv2, WearableId } from '../../misc'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/**
 * Snapshots
 * @alpha
 */
export type Snapshots = {
  face: IPFSv2
  face256: IPFSv2
  face128: IPFSv2
  body: IPFSv2
}

/**
 * Snapshots
 * @alpha
 */
export namespace Snapshots {
  export const schema: JSONSchema<Snapshots> = {
    type: 'object',
    required: ['face', 'face128', 'face256', 'body'],
    properties: {
      face: IPFSv2.schema,
      face256: IPFSv2.schema,
      face128: IPFSv2.schema,
      body: IPFSv2.schema
    }
  }
  const schemaValidator: ValidateFunction<Snapshots> = generateValidator(schema)
  export const validate: ValidateFunction<Snapshots> = (
    snapshots: any
  ): snapshots is Snapshots => schemaValidator(snapshots)
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
      snapshots: Snapshots.schema
    },
    additionalProperties: true
  }
  const schemaValidator: ValidateFunction<AvatarInfo> =
    generateValidator(schema)
  export const validate: ValidateFunction<AvatarInfo> = (
    avatarInfo: any
  ): avatarInfo is AvatarInfo => schemaValidator(avatarInfo)
}

/**
 * Avatar represents a profile avatar
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
}

/**
 * Avatar
 * @alpha
 */
export namespace Avatar {
  export const schema: JSONSchema<Avatar> = {
    type: 'object',
    required: [
      'name',
      'description',
      'ethAddress',
      'version',
      'tutorialStep',
      'avatar'
    ],
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
      avatar: AvatarInfo.schema
    },
    additionalProperties: true
  }
  const schemaValidator: ValidateFunction<Avatar> = generateValidator(schema)
  export const validate: ValidateFunction<Avatar> = (
    avatar: any
  ): avatar is Avatar => schemaValidator(avatar)
}
