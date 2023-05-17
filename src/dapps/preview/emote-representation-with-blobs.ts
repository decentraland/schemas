import { EmoteRepresentationDefinition } from './emote-representation-definition'

/** @alpha */
export type EmoteRepresentationWithBlobs = Omit<EmoteRepresentationDefinition, 'contents'> & {
  contents: { key: string; blob: any }[]
}
