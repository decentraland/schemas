import type { Emitter } from 'mitt'
import type { Metrics } from '../../platform/item/metrics'
import type { PreviewEmoteEventType } from './preview-emote-event-type'

export interface IPreviewController {
  scene: ISceneController
  emote: IEmoteController
}

export type EmoteEvents = {
  [PreviewEmoteEventType.ANIMATION_PLAY]: void
  [PreviewEmoteEventType.ANIMATION_PAUSE]: void
  [PreviewEmoteEventType.ANIMATION_LOOP]: void
  [PreviewEmoteEventType.ANIMATION_END]: void
  [PreviewEmoteEventType.ANIMATION_PLAYING]: { length: number }
}

export interface ISceneController {
  getScreenshot(width: number, height: number): Promise<string>
  getMetrics(): Promise<Metrics>
  changeZoom(zoom: number): Promise<void>
  panCamera(offset: { x?: number; y?: number; z?: number }): Promise<void>
  changeCameraPosition(position: { alpha?: number; beta?: number; radius?: number }): Promise<void>
  cleanup(): Promise<void>
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
  events: Emitter<EmoteEvents>
}
