import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { Network } from './network'

export type Mint = {
  id: string
  creator: string
  beneficiary: string
  minter: string
  itemId: string
  tokenId: string
  issuedId: string
  contractAddress: string
  price: string | null
  timestamp: number
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
}

export enum MintSortBy {
  RECENTLY_MINTED = 'recently_minted',
  MOST_EXPENSIVE = 'most_expensive'
}

export type MintFilters = {
  first?: number
  skip?: number
  sortBy?: MintSortBy
  creator?: string
  beneficiary?: string
  minter?: string
  contractAddress?: string
  itemId?: string
  tokenId?: string
  issuedId?: string
  isSale?: boolean
  network?: Network
}

export namespace Mint {
  export const schema: JSONSchema<Mint> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      creator: {
        type: 'string'
      },
      beneficiary: {
        type: 'string'
      },
      minter: {
        type: 'string'
      },
      price: {
        type: 'string',
        nullable: true
      },
      contractAddress: {
        type: 'string'
      },
      tokenId: {
        type: 'string'
      },
      itemId: {
        type: 'string'
      },
      issuedId: {
        type: 'string'
      },
      timestamp: {
        type: 'integer'
      },
      network: Network.schema,
      chainId: ChainId.schema
    },
    required: [
      'id',
      'creator',
      'beneficiary',
      'minter',
      'itemId',
      'tokenId',
      'issuedId',
      'contractAddress',
      'price',
      'timestamp',
      'network',
      'chainId'
    ]
  }

  export const validate: ValidateFunction<Mint> = generateLazyValidator(schema)
}
