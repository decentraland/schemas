import { PreviewEmoteEventType } from './preview-emote-event-type'

export type EmoteEventPayload<T extends PreviewEmoteEventType> = T extends PreviewEmoteEventType.ANIMATION_PLAYING
  ? { length: number }
  : undefined
