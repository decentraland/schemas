import type { JSONSchema } from '../validation/types.js'

/**
 * @public
 */
export type AuthLink = {
  type: AuthLinkType
  payload: string
  // required if type != 'SIGNER'
  signature?: string
}

/**
 * @public
 */
export enum AuthLinkType {
  'SIGNER' = 'SIGNER',
  'ECDSA_PERSONAL_EPHEMERAL' = 'ECDSA_EPHEMERAL',
  'ECDSA_PERSONAL_SIGNED_ENTITY' = 'ECDSA_SIGNED_ENTITY',
  /**
   * See https://github.com/ethereum/EIPs/issues/1654
   */
  'ECDSA_EIP_1654_EPHEMERAL' = 'ECDSA_EIP_1654_EPHEMERAL',
  /**
   * See https://github.com/ethereum/EIPs/issues/1654
   */
  'ECDSA_EIP_1654_SIGNED_ENTITY' = 'ECDSA_EIP_1654_SIGNED_ENTITY'
  // https://github.com/ethereum/EIPs/issues/1654
}

/**
 * @public
 */
export const authLinkSchema: JSONSchema<AuthLink> = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: Object.values(AuthLinkType)
    },
    payload: { type: 'string' },
    signature: { type: 'string', nullable: true }
  },
  required: ['payload', 'type'],
  if: {
    properties: { type: { not: { const: AuthLinkType.SIGNER } } }
  },
  then: {
    required: ['signature']
  },
  else: {
    // type = 'SIGNER' => signature = '' | null
    oneOf: [
      {
        properties: { signature: { type: 'string', const: '' } },
        required: ['signature']
      },
      { properties: { signature: { type: 'null' } } }
    ]
  }
}

/**
 * AuthChain is an array of elements used to create and verify signatures
 * and ephemeral keys.
 *
 * @public
 */
export type AuthChain = AuthLink[]

/** @public */
export const authChainSchema: JSONSchema<AuthChain> = {
  type: 'array',
  items: authLinkSchema,
  minItems: 1
}
