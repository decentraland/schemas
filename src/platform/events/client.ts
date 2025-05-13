import { EthAddress } from '../../misc'
import { AuthChain } from '../../misc/auth-chain'
import { BaseEvent, Events } from './base'

type ClientBaseMetadata = {
  authChain: AuthChain
  /** @deprecated Use timestamps.reportedAt or timestamps.receivedAt instead */
  timestamp: number
  timestamps: {
    /**
     * Timestamp when the event was reported by the client
     *
     * @type {number}
     */
    reportedAt: number
    /**
     * Timestamp when the event was received by the tracking system (e.g. Segment)
     *
     * @type {number}
     */
    receivedAt: number
  }
  userAddress: EthAddress
  sessionId: string
  realm: string
}

export type MoveToParcelEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.MOVE_TO_PARCEL
  metadata: ClientBaseMetadata & {
    parcel: {
      isEmptyParcel: boolean
      newParcel: string
      oldParcel: string
      sceneHash: string
    }
  }
}

export type UsedEmoteEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.USED_EMOTE
  metadata: ClientBaseMetadata & {
    emote: {
      emoteIndex: number
      isBase: boolean
      itemId: string
      source: string
    }
  }
}

export type PassportOpenedEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.PASSPORT_OPENED
  metadata: ClientBaseMetadata & {
    passport: {
      receiver: EthAddress
    }
  }
}

export type WalkedDistanceEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.WALKED_DISTANCE
  metadata: ClientBaseMetadata & {
    distance: number
    stepCount: number
  }
}

export type VerticalHeightReachedEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.VERTICAL_HEIGHT_REACHED
  metadata: ClientBaseMetadata & {
    height: number
  }
}

export type LoggedInEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.LOGGED_IN
  metadata: ClientBaseMetadata & {
    realm: string
    contextRuntime: string
  }
}

export type LoggedInCachedEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.LOGGED_IN_CACHED
  metadata: ClientBaseMetadata & {
    realm: string
    contextRuntime: string
  }
}
