import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'

/** @internal */
export const SCENE_UPDATE = 'SCENE_UPDATE'

/** @internal */
export type SceneUpdate = {
  type: typeof SCENE_UPDATE
  payload: {
    sceneId: string
    sceneType: string
  }
}

/** @internal */
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

  export const validate: ValidateFunction<SceneUpdate> =
    generateValidator(schema)
}
