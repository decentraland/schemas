import { EthAddress } from '../../misc'
import { BaseEvent, Events } from './base'

export type WebBaseMetadata = {
  userAgent: string
  ip: string
  pagePath: string
  pageUrl: string
  locale: string
  anonymousId: string
  userId?: EthAddress | null
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
}

export type AuthIdentifyEvent = BaseEvent & {
  type: Events.Type.WEB
  subType: Events.SubType.Web.AUTH_IDENTIFY
  metadata: WebBaseMetadata & {
    ethAddress: EthAddress
  }
}
