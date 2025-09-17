import { Emote, EmoteADR74, EmoteADR287 } from '../../platform'
import { EmoteRepresentationDefinition } from './emote-representation-definition'

export type EmoteDefinitionADR74 = Omit<Emote, 'emoteDataADR74'> & {
  emoteDataADR74: Omit<EmoteADR74['emoteDataADR74'], 'representations'> & {
    representations: EmoteRepresentationDefinition[]
  }
}

export type EmoteDefinitionADR287 = Omit<Emote, 'emoteDataADR287'> & {
  emoteDataADR287: Omit<EmoteADR287['emoteDataADR287'], 'representations'> & {
    representations: EmoteRepresentationDefinition[]
  }
}

export type EmoteDefinition = EmoteDefinitionADR74 | EmoteDefinitionADR287
