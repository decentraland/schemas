import { BodyShape } from '../../platform/item/index.js'
import { EmoteDefinition } from './emote-definition.js'
import { PreviewCamera } from './preview-camera.js'
import { PreviewEmote } from './preview-emote.js'
import { PreviewProjection } from './preview-projection.js'
import { PreviewType } from './preview-type.js'
import { SocialEmoteAnimation } from './social-emote-animation.js'
import { WearableDefinition } from './wearable-definition.js'

export enum PreviewUnityMode {
  AUTH = 'authentication',
  BUILDER = 'builder',
  MARKETPLACE = 'marketplace',
  PROFILE = 'profile',
  CONFIG = 'configurator'
}

export type PreviewConfig = {
  item?: WearableDefinition | EmoteDefinition
  wearables: WearableDefinition[]
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
  fadeEffect: boolean
  showSceneBoundaries?: boolean
  showThumbnailBoundaries?: boolean
  offsetX: number
  offsetY: number
  offsetZ: number
  cameraX: number
  cameraY: number
  cameraZ: number
  wheelZoom: number
  wheelPrecision: number
  wheelStart: number
  panning: boolean
  lockAlpha: boolean
  lockBeta: boolean
  lockRadius: boolean
  forceRender?: Array<string>
  unityMode?: PreviewUnityMode
  unity?: boolean
  disableLoader?: boolean
  socialEmote?: SocialEmoteAnimation
}
