import { EmoteRepresentationADR74 } from '../../platform/index.js'

/** @alpha */
export type EmoteRepresentationDefinition = Omit<EmoteRepresentationADR74, 'contents'> & {
  contents: {
    key: string
    url: string
  }[]
}
