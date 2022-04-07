import { WearableRepresentation } from '../../platform/wearables/representation'

/** @alpha */
export type RepresentationDefinition = Omit<
  WearableRepresentation,
  'contents'
> & { contents: { key: string; url: string }[] }
