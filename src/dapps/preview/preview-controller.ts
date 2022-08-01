import EventEmitter from 'events'
import { Metrics } from '../../platform/item/metrics'

export interface IPreviewController {
  scene: ISceneController
  emote: IEmoteController
}
export interface ISceneController {
  getScreenshot(width: number, height: number): Promise<string>
  getMetrics(): Promise<Metrics>
}
export interface IEmoteController {
  getLength(): Promise<number>
  isPlaying(): Promise<boolean>
  goTo(seconds: number): Promise<void>
  play(): Promise<void>
  pause(): Promise<void>
  stop(): Promise<void>
  events: EventEmitter
}
