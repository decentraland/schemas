import type { JSONSchema } from '../../validation/types.js'

/** @public */
export const SCENE_UPDATE = 'SCENE_UPDATE'

/** @public */
export type SceneUpdate = {
  type: typeof SCENE_UPDATE
  payload: {
    sceneId: string
    sceneType: string
  }
}

/** @public */
export const sceneUpdateSchema: JSONSchema<SceneUpdate> = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      enum: [SCENE_UPDATE]
    },
    payload: {
      type: 'object',
      properties: {
        sceneId: {
          type: 'string'
        },
        sceneType: {
          type: 'string'
        }
      },
      additionalProperties: false,
      required: ['sceneId', 'sceneType']
    }
  },
  required: ['payload', 'type']
}
