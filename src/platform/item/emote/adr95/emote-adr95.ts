export const emoteADR95Schema = {
  required: ['emoteDataADR95'],
  // Emotes of ADR95 must be standard XOR thirdparty
  oneOf: [
    {
      required: ['collectionAddress', 'rarity'],
      prohibited: ['merkleProof', 'content'],
      errorMessage:
        'for standard emotes "merkleProof" and "content" are not allowed'
    },
    {
      required: ['merkleProof', 'content'],
      prohibited: ['collectionAddress', 'rarity'],
      errorMessage:
        'for third party emotes "collectionAddress" and "rarity" are not allowed'
    }
  ]
}
