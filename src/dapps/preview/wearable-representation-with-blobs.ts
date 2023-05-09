import { WearableRepresentationDefinition } from './wearable-representation-definition'

/** @alpha */
export type WearableRepresentationWithBlobs = Omit<WearableRepresentationDefinition, 'contents'> & {
  contents: { key: string; blob: any }[]
}
