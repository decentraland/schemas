import type { JSONSchema } from '../validation/types.js'

/**
 * Color3 is a data type that describes a color using R, G and B components
 * @alpha
 */
export type Color3 = { r: number; g: number; b: number }

/**
 * Color3
 * @alpha
 */
export const color3Schema: JSONSchema<Color3> = {
  type: 'object',
  required: ['r', 'g', 'b'],
  properties: {
    r: {
      type: 'number',
      minimum: 0,
      maximum: 1
    },
    g: {
      type: 'number',
      minimum: 0,
      maximum: 1
    },
    b: {
      type: 'number',
      minimum: 0,
      maximum: 1
    }
  }
}

/**
 * @alpha
 */
export type WearableId = string // `urn:${string}`

/**
 * EthAddress is a data type that describes an Ethereum address
 * @public
 */
export type EthAddress = string // `0x${string}`

/**
 * EthAddress
 * @public
 */
export const ethAddressSchema: JSONSchema<EthAddress> = {
  type: 'string',
  pattern: '^0x[a-fA-F0-9]{40}$'
}

/**
 * IPFSv2 is a data type that describes an IPFS v2 hash
 * @public
 */
export type IPFSv2 = string

/**
 * IPFSv2
 * @public
 */
export const ipfsv2Schema: JSONSchema<IPFSv2> = {
  type: 'string',
  pattern: '^(ba)[a-zA-Z0-9]{57}$'
}

/**
 * @public
 */
export type IPFSv1 = string

/**
 * IPFSv1
 * @public
 */
export const ipfsv1Schema: JSONSchema<IPFSv1> = {
  type: 'string',
  pattern: '^(Qm)[a-zA-Z0-9]{44}$'
}
