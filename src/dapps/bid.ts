import { generateValidator, JSONSchema, ValidateFunction } from '../validation'
import { ChainId } from './chain-id'
import { ListingStatus } from './listing-status'
import { Network } from './network'

export type Bid = {
  id: string
  bidder: string
  seller: string
  price: string
  fingerprint: string
  status: ListingStatus
  blockchainId: string
  blockNumber: string
  expiresAt: number
  createdAt: number
  updatedAt: number
  contractAddress: string
  tokenId: string
  network: Network
  chainId: ChainId
}

export namespace Bid {
  export const schema: JSONSchema<Bid> = {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      bidder: {
        type: 'string',
      },
      seller: {
        type: 'string',
      },
      price: {
        type: 'string',
      },
      fingerprint: {
        type: 'string',
      },
      status: ListingStatus.schema,
      blockchainId: {
        type: 'string',
      },
      blockNumber: {
        type: 'string',
      },
      contractAddress: {
        type: 'string',
      },
      tokenId: {
        type: 'string',
      },
      network: Network.schema,
      chainId: ChainId.schema,
      expiresAt: {
        type: 'integer',
      },
      createdAt: {
        type: 'integer',
      },
      updatedAt: {
        type: 'integer',
      },
    },
    required: [
      'id',
      'bidder',
      'seller',
      'price',
      'fingerprint',
      'status',
      'blockchainId',
      'blockNumber',
      'contractAddress',
      'tokenId',
      'network',
      'chainId',
      'expiresAt',
      'createdAt',
      'updatedAt',
    ],
  }

  export const validate: ValidateFunction<Bid> = generateValidator(schema)
}
