import { BaseEvent, Events } from './base'

export type MoveToParcelEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.MOVE_TO_PARCEL
  metadata: {
    address: string
    timestamp: number
    sessionId: string
    realm: string
    isGuest: boolean
    isAuthenticated: boolean
    position: string
    newParcel: string
    oldParcel: string
    exactPosition: {
      x: number
      y: number
      z: number
    }
  }
}
