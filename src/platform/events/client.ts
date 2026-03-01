import { EthAddress } from '../../misc/index.js'
import { AuthChain } from '../../misc/auth-chain.js'
import { BaseEvent, EventType, EventSubTypeClient } from './base.js'

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
  anonymousId: string
  realm: string
}

export type MoveToParcelEvent = BaseEvent & {
  type: EventType.CLIENT
  subType: EventSubTypeClient.MOVE_TO_PARCEL
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
  type: EventType.CLIENT
  subType: EventSubTypeClient.USED_EMOTE
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
  type: EventType.CLIENT
  subType: EventSubTypeClient.PASSPORT_OPENED
  metadata: ClientBaseMetadata & {
    passport: {
      receiver: EthAddress
    }
  }
}

export type WalkedDistanceEvent = BaseEvent & {
  type: EventType.CLIENT
  subType: EventSubTypeClient.WALKED_DISTANCE
  metadata: ClientBaseMetadata & {
    distance: number
    stepCount: number
  }
}

export type VerticalHeightReachedEvent = BaseEvent & {
  type: EventType.CLIENT
  subType: EventSubTypeClient.VERTICAL_HEIGHT_REACHED
  metadata: ClientBaseMetadata & {
    height: number
  }
}

export type LoggedInEvent = BaseEvent & {
  type: EventType.CLIENT
  subType: EventSubTypeClient.LOGGED_IN
  metadata: ClientBaseMetadata & {
    realm: string
    contextRuntime: string
  }
}

export type LoggedInCachedEvent = BaseEvent & {
  type: EventType.CLIENT
  subType: EventSubTypeClient.LOGGED_IN_CACHED
  metadata: ClientBaseMetadata & {
    realm: string
    contextRuntime: string
  }
}
