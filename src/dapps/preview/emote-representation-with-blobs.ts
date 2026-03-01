import { EmoteRepresentationDefinition } from './emote-representation-definition.js'

/** @alpha */
export type EmoteRepresentationWithBlobs = Omit<EmoteRepresentationDefinition, 'contents'> & {
  contents: { key: string; blob: any }[]
}
