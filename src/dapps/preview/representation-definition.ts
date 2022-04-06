import { WearableRepresentation } from '../..'

/** @alpha */
export type RepresentationDefinition = Omit<
  WearableRepresentation,
  'contents'
> & { contents: { key: string; url: string }[] }
