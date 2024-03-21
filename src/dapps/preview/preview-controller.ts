import type { EventEmitter } from '@foxify/events'
import type { Metrics } from '../../platform/item/metrics'
import type { PreviewEmoteEventType } from './preview-emote-event-type'

export interface IPreviewController {
  scene: ISceneController
  emote: IEmoteController
}

export type EmoteEvents = {
  [PreviewEmoteEventType.ANIMATION_PLAY]: () => unknown
  [PreviewEmoteEventType.ANIMATION_PAUSE]: () => unknown
  [PreviewEmoteEventType.ANIMATION_LOOP]: () => unknown
  [PreviewEmoteEventType.ANIMATION_END]: () => unknown
  [PreviewEmoteEventType.ANIMATION_PLAYING]: ({ length }: { length: number }) => unknown
}

export interface ISceneController {
  getScreenshot(width: number, height: number): Promise<string>
  getMetrics(): Promise<Metrics>
  changeZoom(zoom: number): Promise<void>
  panCamera(offset: { x?: number; y?: number; z?: number }): Promise<void>
  changeCameraPosition(position: { alpha?: number; beta?: number; radius?: number }): Promise<void>
}
export interface IEmoteController {
  getLength(): Promise<number>
  isPlaying(): Promise<boolean>
  goTo(seconds: number): Promise<void>
  play(): Promise<void>
  pause(): Promise<void>
  stop(): Promise<void>
  enableSound(): Promise<void>
  disableSound(): Promise<void>
  hasSound(): Promise<boolean>
  events: EventEmitter<EmoteEvents>
}
