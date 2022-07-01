import { BodyShape } from '../../platform/item'
import { PreviewCamera } from './preview-camera'
import { PreviewEmote } from './preview-emote'
import { PreviewType } from './preview-type'
import { WearableDefinition } from './wearable-definition'

export type PreviewConfig = {
  wearable?: WearableDefinition
  wearables: WearableDefinition[]
  bodyShape: BodyShape
  skin: string
  hair: string
  eyes: string
  zoom: number
  type: PreviewType
  background: {
    image?: string
    color: string
    transparent: boolean
  }
  emote: PreviewEmote
  camera: PreviewCamera
  autoRotateSpeed: number
  centerBoundingBox: boolean
  offsetX: number
  offsetY: number
  offsetZ: number
  wheelZoom: number
  wheelPrecision: number
  wheelStart: number
}
