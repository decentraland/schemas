import { BodyShape } from '../../platform/item'
import { EmoteDefinition } from './emote-definition'
import { PreviewCamera } from './preview-camera'
import { PreviewEmote } from './preview-emote'
import { PreviewType } from './preview-type'
import { WearableDefinition } from './wearable-definition'

export type PreviewConfig = {
  wearable?: WearableDefinition | EmoteDefinition
  wearables: (WearableDefinition | EmoteDefinition)[]
  bodyShape: BodyShape
  skin: string
  hair: string
  eyes: string
  zoom: number
  type: PreviewType
  face: boolean
  background: {
    image?: string
    color: string
    transparent: boolean
  }
  emote: PreviewEmote | null
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
