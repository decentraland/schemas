import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

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
export namespace SceneUpdate {
  export const schema: JSONSchema<SceneUpdate> = {
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

  export const validate: ValidateFunction<SceneUpdate> = generateLazyValidator(schema)
}
