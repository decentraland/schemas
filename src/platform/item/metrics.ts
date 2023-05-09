import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type Metrics = {
  triangles: number
  materials: number
  textures: number
  meshes: number
  bodies: number
  entities: number
}

/** @alpha */
export namespace Metrics {
  export const schema: JSONSchema<Metrics> = {
    type: 'object',
    properties: {
      triangles: {
        type: 'number'
      },
      materials: {
        type: 'number'
      },
      textures: {
        type: 'number'
      },
      meshes: {
        type: 'number'
      },
      bodies: {
        type: 'number'
      },
      entities: {
        type: 'number'
      }
    },
    required: ['triangles', 'materials', 'textures', 'meshes', 'bodies', 'entities']
  }

  export const validate: ValidateFunction<Metrics> = generateLazyValidator(schema)
}
