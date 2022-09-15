import { Emote } from '../../platform'
import { EmoteRepresentationDefinition } from './emote-representation-definition'

export type EmoteDefinition = Omit<Emote, 'emoteDataADR74'> & {
  emoteDataADR74: Omit<Emote['emoteDataADR74'], 'representations'> & {
    representations: EmoteRepresentationDefinition[]
  }
}
