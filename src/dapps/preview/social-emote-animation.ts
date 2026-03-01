import { ArmatureId, EmoteClip } from '../../platform/item/emote/adr287/emote-data-adr287.js'

export type SocialEmoteAnimation = {
  title: string
  loop: boolean
  audio?: string
} & {
  [key in ArmatureId]?: EmoteClip
}
