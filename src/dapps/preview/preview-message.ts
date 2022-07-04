import {
  JSONSchema,
  generateValidator,
  ValidateFunction
} from '../../validation'
import { PreviewOptions } from './preview-options'
import { WearableWithBlobs } from './wearable-with-blobs'

export enum PreviewMessageType {
  READY = 'ready',
  LOAD = 'load',
  ERROR = 'error',
  UPDATE = 'update',
  ADD_WEARABLE_WITH_BLOBS = 'add_wearable_with_blobs'
}

/** @alpha */
export namespace PreviewMessageType {
  export const schema: JSONSchema<PreviewMessageType> = {
    type: 'string',
    enum: Object.values(PreviewMessageType)
  }

  export const validate: ValidateFunction<PreviewMessageType> =
    generateValidator(schema)
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
    : T extends PreviewMessageType.ADD_WEARABLE_WITH_BLOBS
    ? { wearableWithBlobs: WearableWithBlobs }
    : unknown

export const sendMessage = <T extends PreviewMessageType>(
  window: Window,
  type: T,
  payload: PreviewMessagePayload<T>,
  targetOrigin = '*'
) => {
  const event = { type, payload }
  window.postMessage(event, targetOrigin)
}
