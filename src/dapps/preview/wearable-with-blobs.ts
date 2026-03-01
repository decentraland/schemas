import { WearableRepresentationWithBlobs } from './wearable-representation-with-blobs.js'
import { WearableDefinition } from './wearable-definition.js'

/** @alpha */
export type WearableWithBlobs = Omit<WearableDefinition, 'data'> & {
  data: Omit<WearableDefinition['data'], 'representations'> & {
    representations: WearableRepresentationWithBlobs[]
  }
}
