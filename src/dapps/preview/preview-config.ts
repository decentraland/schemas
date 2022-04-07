import { WearableBodyShape } from '../../platform/wearables/wearable-body-shape'
import { PreviewCamera } from './preview-camera'
import { PreviewEmote } from './preview-emote'
import { PreviewType } from './preview-type'
import { WearableDefinition } from './wearable-definition'

export type PreviewConfig = {
  wearable?: WearableDefinition
  wearables: WearableDefinition[]
  bodyShape: WearableBodyShape
  skin: string
  hair: string
  eyes: string
  zoom: number
  type: PreviewType
  background: {
    image?: string
    gradient?: string
  }
  emote: PreviewEmote
  camera: PreviewCamera
  autoRotateSpeed: number
  offsetX: number
  offsetY: number
  offsetZ: number
}
