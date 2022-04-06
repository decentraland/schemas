import { RepresentationDefinition, Wearable } from '../..'

/** @alpha */
export type WearableDefinition = Omit<Wearable, 'data'> & {
  data: Omit<Wearable['data'], 'representations'> & {
    representations: RepresentationDefinition[]
  }
  emoteDataV0?: {
    loop: boolean
  }
}
