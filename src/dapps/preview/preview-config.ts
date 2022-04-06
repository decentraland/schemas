import {
  PreviewCamera,
  PreviewEmote,
  PreviewType,
  WearableBodyShape,
  WearableDefinition
} from '../..'

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
