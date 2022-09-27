import { Wearable } from '../../platform/item/wearable'
import { WearableRepresentationDefinition } from './wearable-representation-definition'

/** @alpha */
export type WearableDefinition = Omit<Wearable, 'data'> & {
  data: Omit<Wearable['data'], 'representations'> & {
    representations: WearableRepresentationDefinition[]
  }
}
