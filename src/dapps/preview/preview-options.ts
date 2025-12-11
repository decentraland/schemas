import { BodyShape } from '../../platform/item'
import { EmoteWithBlobs } from './emote-with-blobs'
import { PreviewCamera } from './preview-camera'
import { PreviewUnityMode } from './preview-config'
import { PreviewEmote } from './preview-emote'
import { PreviewProjection } from './preview-projection'
import { PreviewType } from './preview-type'
import { SocialEmoteAnimation } from './social-emote-animation'
import { WearableWithBlobs } from './wearable-with-blobs'

/** @alpha */
export type PreviewOptions = {
  contractAddress?: string | null
  tokenId?: string | null
  itemId?: string | null
  profile?: string | null
  bodyShape?: BodyShape | null
  type?: PreviewType | null
  skin?: string | null
  hair?: string | null
  eyes?: string | null
  urns?: string[] | null
  urls?: string[] | null
  base64s?: string[] | null
  blob?: WearableWithBlobs | EmoteWithBlobs | null
  zoom?: number | null
  zoomScale?: number | null
  emote?: PreviewEmote | null
  camera?: PreviewCamera | null
  projection?: PreviewProjection | null
  autoRotateSpeed?: number | null
  offsetX?: number | null
  offsetY?: number | null
  offsetZ?: number | null
  cameraX?: number | null
  cameraY?: number | null
  cameraZ?: number | null
  wheelZoom?: number | null
  wheelPrecision?: number | null
  wheelStart?: number | null
  background?: string | null
  disableBackground?: boolean | null
  disableAutoCenter?: boolean | null
  disableAutoRotate?: boolean | null
  disableFace?: boolean | null
  disableDefaultWearables?: boolean | null
  disableDefaultEmotes?: boolean | null
  disableFadeEffect?: boolean | null
  showSceneBoundaries?: boolean
  showThumbnailBoundaries?: boolean
  peerUrl?: string | null
  /** @deprecated Use marketplaceServerUrl instead.*/
  nftServerUrl?: string | null
  marketplaceServerUrl?: string | null
  panning?: boolean
  lockAlpha?: boolean
  lockBeta?: boolean
  lockRadius?: boolean
  username?: string | null
  unityMode?: PreviewUnityMode | null
  unity?: boolean | null
  disableLoader?: boolean | null
  socialEmote?: SocialEmoteAnimation | null
}
