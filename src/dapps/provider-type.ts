import type { JSONSchema } from '../validation/types.js'

/**
 * Different supported providers
 * @alpha
 */
export enum ProviderType {
  INJECTED = 'injected',
  MAGIC = 'magic',
  MAGIC_TEST = 'magic_test',
  FORTMATIC = 'formatic',
  NETWORK = 'network',
  WALLET_CONNECT = 'wallet_connect',
  WALLET_CONNECT_V2 = 'wallet_connect_v2',
  WALLET_LINK = 'wallet_link',
  METAMASK_MOBILE = 'metamask_mobile',
  AUTH_SERVER = 'auth_server',
  THIRDWEB = 'thirdweb'
}

/**
 * @alpha
 */
export const providerTypeSchema: JSONSchema<ProviderType> = {
  type: 'string',
  enum: Object.values(ProviderType)
}
