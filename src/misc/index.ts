import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

/**
 * Color3 is a data type that describes a color using R, G and B components
 * @alpha
 */
export type Color3 = { r: number; g: number; b: number }

/**
 * Color3
 * @alpha
 */
export namespace Color3 {
  export const schema: JSONSchema<Color3> = {
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
  const schemaValidator: ValidateFunction<Color3> = generateLazyValidator(schema)
  export const validate: ValidateFunction<Color3> = (color: any): color is Color3 => schemaValidator(color)
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
export namespace EthAddress {
  export const schema: JSONSchema<EthAddress> = {
    type: 'string',
    pattern: '^0x[a-fA-F0-9]{40}$'
  }
  const regexp = new RegExp(schema.pattern!)
  export const validate: ValidateFunction<EthAddress> = (ethAddress: any): ethAddress is EthAddress =>
    regexp.test(ethAddress)
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
export namespace IPFSv2 {
  export const schema: JSONSchema<IPFSv2> = {
    type: 'string',
    pattern: '^(ba)[a-zA-Z0-9]{57}$'
  }
  const regexp = new RegExp(schema.pattern!)
  export const validate: ValidateFunction<IPFSv2> = (hash: any): hash is IPFSv2 => regexp.test(hash)
}

/**
 * @public
 */
export type IPFSv1 = string

/**
 * IPFSv1
 * @public
 */
export namespace IPFSv1 {
  export const schema: JSONSchema<IPFSv1> = {
    type: 'string',
    pattern: '^(Qm)[a-zA-Z0-9]{44}$'
  }
  const regexp = new RegExp(schema.pattern!)
  export const validate: ValidateFunction<IPFSv1> = (hash: any): hash is IPFSv1 => regexp.test(hash)
}
