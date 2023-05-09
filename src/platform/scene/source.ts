import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type Source = {
  version?: number
  origin: string
  projectId: string
  point?: { x: number; y: number }
  rotation?: 'north' | 'east' | 'south' | 'west'
  layout?: { rows: number; cols: number }
  isEmpty?: boolean
}

/** @alpha */
export namespace Source {
  export const schema: JSONSchema<Source> = {
    type: 'object',
    properties: {
      version: {
        type: 'number',
        nullable: true
      },
      origin: {
        type: 'string'
      },
      projectId: {
        type: 'string'
      },
      point: {
        type: 'object',
        properties: {
          x: { type: 'integer' },
          y: { type: 'integer' }
        },
        nullable: true,
        required: ['x', 'y']
      },
      rotation: {
        type: 'string',
        enum: ['north', 'east', 'south', 'west'],
        nullable: true
      },
      layout: {
        type: 'object',
        properties: {
          rows: {
            type: 'integer'
          },
          cols: {
            type: 'integer'
          }
        },
        nullable: true,
        required: ['rows', 'cols']
      },
      isEmpty: {
        type: 'boolean',
        nullable: true
      }
    },
    additionalProperties: true,
    required: ['origin', 'projectId']
  }

  export const validate: ValidateFunction<Source> = generateLazyValidator(schema)
}
