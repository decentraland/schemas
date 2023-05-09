import { EmoteRepresentationADR74 } from '../../platform'

/** @alpha */
export type EmoteRepresentationDefinition = Omit<EmoteRepresentationADR74, 'contents'> & {
  contents: {
    key: string
    url: string
  }[]
}
