import { MerkleProof } from '../merkle-tree/merkle-proof'
import { BaseItem } from './base-item'

export type ThirdPartyProps = {
  merkleProof: MerkleProof
  content: Record<string, string>
}

export const thirdPartyProps = {
  merkleProof: MerkleProof.schema,
  content: {
    type: 'object',
    nullable: false,
    additionalProperties: { type: 'string' },
    required: [] as any[]
  }
} as const

export function isThirdParty(
  item: BaseItem
): item is BaseItem & ThirdPartyProps {
  const itemAsThirdParty = item as BaseItem & ThirdPartyProps
  if (!MerkleProof.validate(itemAsThirdParty.merkleProof)) return false
  if (!itemAsThirdParty.content) return false
  if (itemAsThirdParty.merkleProof.hashingKeys.length === 0) return false
  const containsAllKeys = itemAsThirdParty.merkleProof.hashingKeys.every(
    (key) => itemAsThirdParty.hasOwnProperty(key)
  )

  const proofIsNotEmpty = itemAsThirdParty.merkleProof.proof.length > 0

  return containsAllKeys && proofIsNotEmpty
}
