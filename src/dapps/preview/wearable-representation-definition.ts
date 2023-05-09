import { WearableRepresentation } from '../../platform/item/wearable'

/** @alpha */
export type WearableRepresentationDefinition = Omit<WearableRepresentation, 'contents'> & {
  contents: { key: string; url: string }[]
}
