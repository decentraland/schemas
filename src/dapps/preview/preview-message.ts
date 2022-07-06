import {
  JSONSchema,
  generateLazyValidator,
  ValidateFunction
} from '../../validation'
import { PreviewOptions } from './preview-options'

export enum PreviewMessageType {
  READY = 'ready',
  LOAD = 'load',
  ERROR = 'error',
  UPDATE = 'update',
  CONTROLLER_REQUEST = 'controller_request',
  CONTROLLER_RESPONSE = 'controller_response'
}

/** @alpha */
export namespace PreviewMessageType {
  export const schema: JSONSchema<PreviewMessageType> = {
    type: 'string',
    enum: Object.values(PreviewMessageType)
  }

  export const validate: ValidateFunction<PreviewMessageType> =
    generateLazyValidator(schema)
}

export type PreviewMessagePayload<T extends PreviewMessageType> =
  T extends PreviewMessageType.READY
    ? null
    : T extends PreviewMessageType.LOAD
    ? null
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
          | 'getLength'
          | 'isPlaying'
          | 'play'
          | 'pause'
          | 'stop'
          | 'goTo'
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
