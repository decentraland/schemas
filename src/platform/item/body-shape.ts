import type { JSONSchema } from '../../validation/types.js'

/** @alpha */
export enum BodyShape {
  MALE = 'urn:decentraland:off-chain:base-avatars:BaseMale',
  FEMALE = 'urn:decentraland:off-chain:base-avatars:BaseFemale'
}

/** @alpha */
export const bodyShapeSchema: JSONSchema<BodyShape> = {
  type: 'string',
  enum: Object.values(BodyShape)
}
