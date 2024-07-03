import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/**
 * Mapping
 * @alpha
 */
export type Mapping = SingleMapping | AllMapping | RangeMapping | MultipleMapping

/**
 * SingleMapping
 * @alpha
 */
export type SingleMapping = {
  type: 'single'
  id: number
}

/**
 * AllMapping
 * @alpha
 */
export type AllMapping = {
  type: 'all'
}

/**
 * RangeMapping
 * @alpha
 */
export type RangeMapping = {
  type: 'range'
  from: number
  to: number
}

/**
 * MultipleMapping
 * @alpha
 */
export type MultipleMapping = {
  type: 'multiple'
  ids: number[]
}

/**
 * Mappings
 * @alpha
 */
export namespace Mapping {
  export const schema: JSONSchema<Mapping> = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        enum: ['single', 'all', 'range', 'multiple']
      }
    },
    required: ['type'],
    oneOf: [
      {
        type: 'object',
        properties: {
          type: { type: 'string', const: 'single' },
          id: { type: 'number' }
        },
        required: ['type', 'id'],
        additionalProperties: false
      },
      {
        type: 'object',
        properties: {
          type: { type: 'string', const: 'all' }
        },
        required: ['type'],
        additionalProperties: false
      },
      {
        type: 'object',
        properties: {
          type: { type: 'string', const: 'range' },
          from: { type: 'number' },
          to: { type: 'number' }
        },
        required: ['type', 'from', 'to'],
        additionalProperties: false
      },
      {
        type: 'object',
        properties: {
          type: { type: 'string', const: 'multiple' },
          ids: { type: 'array', items: { type: 'number' } }
        },
        required: ['type', 'ids'],
        additionalProperties: false
      }
    ]
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}
