import { Wearable } from '../../platform/item/wearable'
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
