import { WearableRepresentationWithBlobs } from './wearable-representation-with-blobs'
import { WearableDefinition } from './wearable-definition'

/** @alpha */
export type WearableWithBlobs = Omit<WearableDefinition, 'data'> & {
  data: Omit<WearableDefinition['data'], 'representations'> & {
    representations: WearableRepresentationWithBlobs[]
  }
}
