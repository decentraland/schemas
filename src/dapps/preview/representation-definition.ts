import { WearableRepresentation } from '../../platform/item/wearable'

/** @alpha */
export type RepresentationDefinition = Omit<
  WearableRepresentation,
  'contents'
> & { contents: { key: string; url: string }[] }
