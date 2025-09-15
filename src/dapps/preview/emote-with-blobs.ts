import { EmoteDefinition, EmoteDefinitionADR74, EmoteDefinitionADR287 } from './emote-definition'
import { EmoteRepresentationWithBlobs } from './emote-representation-with-blobs'

/** @alpha */
export type EmoteWithBlobsADR74 = Omit<EmoteDefinitionADR74, 'emoteDataADR74'> & {
  emoteDataADR74: Omit<EmoteDefinitionADR74['emoteDataADR74'], 'representations'> & {
    representations: EmoteRepresentationWithBlobs[]
  }
}

/** @alpha */
export type EmoteWithBlobsADR287 = Omit<EmoteDefinition, 'emoteDataADR287'> & {
  emoteDataADR287: Omit<EmoteDefinitionADR287['emoteDataADR287'], 'representations'> & {
    representations: EmoteRepresentationWithBlobs[]
  }
}

/** @alpha */
export type EmoteWithBlobs = EmoteWithBlobsADR74 | EmoteWithBlobsADR287
