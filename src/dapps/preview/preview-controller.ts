import { PreviewSceneMetrics } from './preview-metrics'

export interface IPreviewController {
  scene: ISceneController
  emote: IEmoteController
}

export interface ISceneController {
  getScreenshot(width: number, height: number): Promise<string>
  getMetrics(): PreviewSceneMetrics
}

export interface IEmoteController {
  getLength(): number
  isPlaying(): boolean
  goTo(seconds: number): void
  play(): void
  pause(): void
  stop(): void
}
