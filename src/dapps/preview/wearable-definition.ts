import { Wearable } from '../../platform/item/wearable/index.js'
import { WearableRepresentationDefinition } from './wearable-representation-definition.js'

/** @alpha */
export type WearableDefinition = Omit<Wearable, 'data'> & {
  data: Omit<Wearable['data'], 'representations'> & {
    representations: WearableRepresentationDefinition[]
  }
}
