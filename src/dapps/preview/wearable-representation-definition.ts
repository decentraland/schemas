import { WearableRepresentation } from '../../platform/item/wearable/index.js'

/** @alpha */
export type WearableRepresentationDefinition = Omit<WearableRepresentation, 'contents'> & {
  contents: { key: string; url: string }[]
}
