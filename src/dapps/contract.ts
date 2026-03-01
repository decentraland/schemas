import type { JSONSchema } from '../validation/types.js'
import { ChainId, chainIdSchema } from './chain-id.js'
import { Network, networkSchema } from './network.js'
import { NFTCategory, nftCategorySchema } from './nft-category.js'

export type Contract = {
  name: string
  address: string
  category: NFTCategory
  network: Network.ETHEREUM | Network.MATIC
  chainId: ChainId
}

export type ContractFilters = {
  category?: NFTCategory
  network?: Network
}

export enum ContractSortBy {
  NAME = 'name'
}

export const contractSchema: JSONSchema<Contract> = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    category: nftCategorySchema,
    network: networkSchema,
    chainId: chainIdSchema
  },
  required: ['name', 'address', 'category', 'network', 'chainId']
}
