import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

/**
 * Different supported chain ids
 * @alpha
 */
export enum ChainId {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_ROPSTEN = 3,
  ETHEREUM_RINKEBY = 4,
  ETHEREUM_GOERLI = 5,
  ETHEREUM_KOVAN = 42,
  MATIC_MAINNET = 137,
  MATIC_MUMBAI = 80001,
}

/**
 * @alpha
 */
export namespace ChainId {
  export const schema: JSONSchema<ChainId> = {
    type: 'number',
    enum: Object.values(ChainId),
  }

  export const validate: ValidateFunction<ChainId> = generateValidator(schema)
}
