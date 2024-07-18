import { BaseEvent, EventSubType, EventType } from './base'

export type MoveToParcelEvent = BaseEvent & {
  type: EventType.CLIENT
  subType: EventSubType.MOVE_TO_PARCEL
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
