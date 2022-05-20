import { Wearable } from '../../platform/wearables/wearable'
import { RepresentationDefinition } from './representation-definition'

/** @alpha */
export type WearableDefinition = Omit<Wearable, 'data'> & {
  data: Omit<Wearable['data'], 'representations'> & {
    representations: RepresentationDefinition[]
  }
  emoteDataV0?: {
    loop: boolean
  }
}
