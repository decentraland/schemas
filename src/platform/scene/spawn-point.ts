import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type SpawnPoint = {
  name?: string
  position: SinglePosition | MultiPosition
  default?: boolean
  cameraTarget?: SinglePosition
}

type SinglePosition = {
  x: number
  y: number
  z: number
}
type MultiPosition = {
  x: number[]
  y: number[]
  z: number[]
}

/** @alpha */
export namespace SpawnPoint {
  export const schema: JSONSchema<SpawnPoint> = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        nullable: true
      },
      position: {
        type: 'object',
        oneOf: [{ $ref: '#single-position' }, { $ref: '#multi-position' }],
        required: ['x', 'y', 'z']
      },
      default: {
        type: 'boolean',
        nullable: true
      },
      cameraTarget: {
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          z: { type: 'number' }
        },
        required: ['x', 'y', 'z'],
        nullable: true
      }
    },
    required: ['position'],
    definitions: {
      'single-position': {
        $id: '#single-position',
        type: 'object',
        properties: {
          x: { type: 'number' },
          y: { type: 'number' },
          z: { type: 'number' }
        },
        required: ['x', 'y', 'z']
      },
      'multi-position': {
        $id: '#multi-position',
        type: 'object',
        properties: {
          x: { type: 'array', items: { type: 'number' }, minItems: 1 },
          y: { type: 'array', items: { type: 'number' }, minItems: 1 },
          z: { type: 'array', items: { type: 'number' }, minItems: 1 }
        },
        required: ['x', 'y', 'z']
      }
    }
  }

  export const validate: ValidateFunction<SpawnPoint> = generateLazyValidator(schema)
}
