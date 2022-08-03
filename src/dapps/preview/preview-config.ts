import { BodyShape } from '../../platform/item'
import { EmoteDefinition } from './emote-definition'
import { PreviewCamera } from './preview-camera'
import { PreviewEmote } from './preview-emote'
import { PreviewProjection } from './preview-projection'
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
  projection: PreviewProjection
  autoRotateSpeed: number
  centerBoundingBox: boolean
  offsetX: number
  offsetY: number
  offsetZ: number
  cameraX: number
  cameraY: number
  cameraZ: number
  wheelZoom: number
  wheelPrecision: number
  wheelStart: number
}
