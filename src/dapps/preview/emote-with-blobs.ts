import { EmoteDefinition } from './emote-definition'
import { EmoteRepresentationWithBlobs } from './emote-representation-with-blobs'

/** @alpha */
export type EmoteWithBlobs = Omit<EmoteDefinition, 'emoteDataADR74'> & {
  emoteDataADR74: Omit<EmoteDefinition['emoteDataADR74'], 'representations'> & {
    representations: EmoteRepresentationWithBlobs[]
  }
}
