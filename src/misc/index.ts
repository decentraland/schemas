import { generateValidator, JSONSchema, ValidateFunction } from ".."

export type Color3 = { r: number; g: number; b: number }
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
      },
    }
  }
  const schemaValidator: ValidateFunction<Color3> = generateValidator(schema);
  export const validate: ValidateFunction<Color3> = (color: any): color is Color3 =>
    schemaValidator(color)
}

export type WearableId = string

export type EthAddress = string
export namespace EthAddress {
  export const schema: JSONSchema<EthAddress> = {
    type: 'string',
    pattern: '^0x[a-fA-F0-9]{40}$'
  }
  const schemaValidator: ValidateFunction<EthAddress> = generateValidator(schema);
  export const validate: ValidateFunction<EthAddress> = (ethAddress: any): ethAddress is EthAddress =>
    schemaValidator(ethAddress)
}