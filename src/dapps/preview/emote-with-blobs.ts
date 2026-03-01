import { EmoteDefinition } from './emote-definition.js'
import { EmoteRepresentationWithBlobs } from './emote-representation-with-blobs.js'

/** @alpha */
export type EmoteWithBlobs = Omit<EmoteDefinition, 'emoteDataADR74'> & {
  emoteDataADR74: Omit<EmoteDefinition['emoteDataADR74'], 'representations'> & {
    representations: EmoteRepresentationWithBlobs[]
  }
}
