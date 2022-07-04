import { BodyShape } from '../../platform/item'
import { PreviewCamera } from './preview-camera'
import { PreviewEmote } from './preview-emote'
import { PreviewEnv } from './preview-env'

/** @alpha */
export type PreviewOptions = {
  contractAddress?: string | null
  tokenId?: string | null
  itemId?: string | null
  profile?: string | null
  bodyShape?: BodyShape | null
  skin?: string | null
  hair?: string | null
  eyes?: string | null
  urns?: string[] | null
  urls?: string[] | null
  base64s?: string[] | null
  zoom?: number | null
  emote?: PreviewEmote | null
  camera?: PreviewCamera | null
  autoRotateSpeed?: number | null
  offsetX?: number | null
  offsetY?: number | null
  offsetZ?: number | null
  wheelZoom?: number | null
  wheelPrecision?: number | null
  wheelStart?: number | null
  background?: string | null
  disableBackground?: boolean | null
  disableAutoCenter?: boolean | null
  disableAutoRotate?: boolean | null
  disableFace?: boolean | null
  disableDefaultWearables?: boolean | null
  env?: PreviewEnv | null
}
