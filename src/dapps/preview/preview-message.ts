import {
  JSONSchema,
  generateValidator,
  ValidateFunction
} from '../../validation'
import { PreviewOptions } from './preview-options'

export enum PreviewMessageType {
  LOAD = 'load',
  ERROR = 'error',
  UPDATE = 'update'
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
  T extends PreviewMessageType.LOAD
    ? null
    : T extends PreviewMessageType.ERROR
    ? { message: string }
    : T extends PreviewMessageType.UPDATE
    ? { options: PreviewOptions }
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
