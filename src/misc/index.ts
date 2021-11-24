import { generateValidator, JSONSchema, ValidateFunction } from '..'

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
  const schemaValidator: ValidateFunction<Color3> = generateValidator(schema)
  export const validate: ValidateFunction<Color3> = (
    color: any
  ): color is Color3 => schemaValidator(color)
}
/**
 * @alpha
 */
export type WearableId = string

/**
 * EthAddress is a data type that describes an Ethereum address
 * @alpha
 */
export type EthAddress = string

/**
 * EthAddress
 * @alpha
 */
export namespace EthAddress {
  export const schema: JSONSchema<EthAddress> = {
    type: 'string',
    pattern: '^0x[a-fA-F0-9]{40}$'
  }
  const schemaValidator: ValidateFunction<EthAddress> =
    generateValidator(schema)
  export const validate: ValidateFunction<EthAddress> = (
    ethAddress: any
  ): ethAddress is EthAddress => schemaValidator(ethAddress)
}

/**
 * IPFSv2 is a data type that describes an IPFS v2 hash
 * @alpha
 */
export type IPFSv2 = string

/**
 * IPFSv2
 * @alpha
 */
export namespace IPFSv2 {
  export const schema: JSONSchema<IPFSv2> = {
    type: 'string',
    pattern: '^(ba)[a-zA-Z0-9]{57}$'
  }
  const schemaValidator: ValidateFunction<IPFSv2> = generateValidator(schema)
  export const validate: ValidateFunction<IPFSv2> = (
    hash: any
  ): hash is IPFSv2 => schemaValidator(hash)
}
