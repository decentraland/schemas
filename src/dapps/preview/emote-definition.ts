import { Emote } from '../../platform/index.js'
import { EmoteRepresentationDefinition } from './emote-representation-definition.js'

export type EmoteDefinition = Omit<Emote, 'emoteDataADR74'> & {
  emoteDataADR74: Omit<Emote['emoteDataADR74'], 'representations'> & {
    representations: EmoteRepresentationDefinition[]
  }
}
