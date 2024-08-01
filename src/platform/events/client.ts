import { EthAddress } from '../../misc'
import { AuthLink } from '../../misc/auth-chain'
import { BaseEvent, Events } from './base'

export type MoveToParcelEvent = BaseEvent & {
  type: Events.Type.CLIENT
  subType: Events.SubType.Client.MOVE_TO_PARCEL
  metadata: {
    authChain: AuthLink
    parcel: {
      isEmptyParcel: boolean
      newParcel: string
      oldParcel: string
      sceneHash: string
    }
    timestamp: number
    userAddress: EthAddress
    realm: string
  }
}
