import { WearableRepresentationDefinition } from './wearable-representation-definition.js'

/** @alpha */
export type WearableRepresentationWithBlobs = Omit<WearableRepresentationDefinition, 'contents'> & {
  contents: { key: string; blob: any }[]
}
