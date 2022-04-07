import { WearableBodyShape } from '../../platform/wearables/wearable-body-shape'
import { PreviewCamera } from './preview-camera'
import { PreviewEmote } from './preview-emote'
import { PreviewEnv } from './preview-env'

/** @alpha */
export type PreviewOptions = {
  contractAddress?: string | null
  tokenId?: string | null
  itemId?: string | null
  profile?: string | null
  bodyShape?: WearableBodyShape | null
  skin?: string | null
  hair?: string | null
  eyes?: string | null
  urns?: string[] | null
  zoom?: number | null
  emote?: PreviewEmote | null
  camera?: PreviewCamera | null
  autoRotateSpeed?: number | null
  offsetX?: number | null
  offsetY?: number | null
  offsetZ?: number | null
  transparentBackground?: boolean
  env?: PreviewEnv | null
}
