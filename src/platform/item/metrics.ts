import type { JSONSchema } from '../../validation/types.js'

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
export const metricsSchema: JSONSchema<Metrics> = {
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
