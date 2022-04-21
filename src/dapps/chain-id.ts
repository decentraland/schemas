import { generateValidator, JSONSchema, ValidateFunction } from "../validation";

import { ChainName } from "./chain-name";
import { Network } from "./network";

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
 * Get the chain name by chain id
 * @alpha
 */
export function getChainName(chainId: ChainId): ChainName | null {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return ChainName.ETHEREUM_MAINNET;
    case ChainId.ETHEREUM_ROPSTEN:
      return ChainName.ETHEREUM_ROPSTEN;
    case ChainId.ETHEREUM_RINKEBY:
      return ChainName.ETHEREUM_RINKEBY;
    case ChainId.ETHEREUM_GOERLI:
      return ChainName.ETHEREUM_GOERLI;
    case ChainId.ETHEREUM_KOVAN:
      return ChainName.ETHEREUM_KOVAN;
    case ChainId.MATIC_MAINNET:
      return ChainName.MATIC_MAINNET;
    case ChainId.MATIC_MUMBAI:
      return ChainName.MATIC_MUMBAI;
    default:
      return null;
  }
}

/**
 * Get the chain name by chain id
 * @alpha
 */
export function getURNProtocol(chainId: ChainId): string {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return "mainnet";
    case ChainId.ETHEREUM_ROPSTEN:
      return "ropsten";
    case ChainId.ETHEREUM_RINKEBY:
      return "rinkeby";
    case ChainId.ETHEREUM_GOERLI:
      return "goerli";
    case ChainId.ETHEREUM_KOVAN:
      return "kovan";
    case ChainId.MATIC_MAINNET:
      return "matic";
    case ChainId.MATIC_MUMBAI:
      return "mumbai";
  }
}

/**
 * Using a base chain id, it'll map the corresponding chain id for the ethereum and matic networks.
 * For example, if trying to determine which chain id is used to map Ropsten in Matic you'd do:
 *    getNetworkMapping(ChainId.ETHEREUM_ROPSTEN)[Network.MATIC]
 * @alpha
 */
export function getNetworkMapping(chainId: ChainId): {
  [Network.ETHEREUM]: ChainId;
  [Network.MATIC]: ChainId;
} {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_MAINNET,
        [Network.MATIC]: ChainId.MATIC_MAINNET,
      };
    case ChainId.ETHEREUM_ROPSTEN:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_ROPSTEN,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
      };
    case ChainId.ETHEREUM_RINKEBY:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_RINKEBY,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
      };
    case ChainId.ETHEREUM_GOERLI:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_GOERLI,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
      };
    case ChainId.ETHEREUM_KOVAN:
      return {
        [Network.ETHEREUM]: ChainId.ETHEREUM_KOVAN,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
      };
    case ChainId.MATIC_MAINNET:
      return {
        [Network.ETHEREUM]: ChainId.MATIC_MAINNET,
        [Network.MATIC]: ChainId.MATIC_MAINNET,
      };
    case ChainId.MATIC_MUMBAI:
      return {
        [Network.ETHEREUM]: ChainId.MATIC_MUMBAI,
        [Network.MATIC]: ChainId.MATIC_MUMBAI,
      };
  }
}

/**
 * Get's the network for a specific chain id
 * @alpha
 */
export function getNetwork(chainId: ChainId): Network {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
    case ChainId.ETHEREUM_ROPSTEN:
    case ChainId.ETHEREUM_GOERLI:
    case ChainId.ETHEREUM_KOVAN:
    case ChainId.ETHEREUM_RINKEBY:
      return Network.ETHEREUM;
    case ChainId.MATIC_MAINNET:
    case ChainId.MATIC_MUMBAI:
      return Network.MATIC;
  }
}

/**
 * @alpha
 */
export namespace ChainId {
  export const schema: JSONSchema<ChainId> = {
    type: "number",
    enum: Object.values(ChainId),
  };

  export const validate: ValidateFunction<ChainId> = generateValidator(schema);
}
