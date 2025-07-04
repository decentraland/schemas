import { JSONSchema, generateLazyValidator, ValidateFunction } from '../../validation'
import { PreviewEmoteEventType } from './preview-emote-event-type'
import { EmoteEventPayload } from './preview-emote-event-payload'
import { PreviewOptions } from './preview-options'

export enum PreviewMessageType {
  READY = 'ready',
  LOAD = 'load',
  ERROR = 'error',
  UPDATE = 'update',
  CONTROLLER_REQUEST = 'controller_request',
  CONTROLLER_RESPONSE = 'controller_response',
  EMOTE_EVENT = 'emote_event'
}

export enum PreviewRenderer {
  BABYLON = 'babylon',
  UNITY = 'unity'
}

/** @alpha */
export namespace PreviewMessageType {
  export const schema: JSONSchema<PreviewMessageType> = {
    type: 'string',
    enum: Object.values(PreviewMessageType)
  }

  export const validate: ValidateFunction<PreviewMessageType> = generateLazyValidator(schema)
}

export type PreviewMessagePayload<T extends PreviewMessageType> = T extends PreviewMessageType.READY
  ? null
  : T extends PreviewMessageType.LOAD
  ? { renderer: PreviewRenderer } | null
  : T extends PreviewMessageType.ERROR
  ? { message: string }
  : T extends PreviewMessageType.UPDATE
  ? { options: PreviewOptions }
  : T extends PreviewMessageType.CONTROLLER_REQUEST
  ? {
      id: string
      namespace: 'scene' | 'emote'
      method:
        | 'getScreenshot'
        | 'getMetrics'
        | 'changeZoom'
        | 'changeCameraPosition'
        | 'panCamera'
        | 'cleanup'
        | 'getLength'
        | 'isPlaying'
        | 'play'
        | 'pause'
        | 'stop'
        | 'goTo'
        | 'enableSound'
        | 'disableSound'
        | 'hasSound'
      params: any[]
    }
  : T extends PreviewMessageType.CONTROLLER_RESPONSE
  ?
      | {
          id: string
          ok: true
          result: any
        }
      | {
          id: string
          ok: false
          error: string
        }
  : T extends PreviewMessageType.EMOTE_EVENT
  ? {
      type: PreviewEmoteEventType
      payload: EmoteEventPayload<PreviewEmoteEventType>
    }
  : unknown

export const sendMessage = <T extends PreviewMessageType>(
  window: { postMessage(event: any, targetOrigin: string): any },
  type: T,
  payload: PreviewMessagePayload<T>,
  targetOrigin = '*'
) => {
  const event = { type, payload }
  window.postMessage(event, targetOrigin)
}
