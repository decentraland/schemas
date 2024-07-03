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
  id: string
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
  from: string
  to: string
}

/**
 * MultipleMapping
 * @alpha
 */
export type MultipleMapping = {
  type: 'multiple'
  ids: string[]
}

/**
 * Mappings
 * @alpha
 */
export namespace SingleMapping {
  export const schema: JSONSchema<SingleMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: 'single' },
      id: { type: 'string', pattern: '^[0-9]+$' }
    },
    required: ['type', 'id'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}

/**
 * Mappings
 * @alpha
 */
export namespace AllMapping {
  export const schema: JSONSchema<AllMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: 'all' }
    },
    required: ['type'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}

/**
 * Mappings
 * @alpha
 */
export namespace RangeMapping {
  export const schema: JSONSchema<RangeMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: 'range' },
      from: { type: 'string', pattern: '^[0-9]+$' },
      to: { type: 'string', pattern: '^[0-9]+$' }
    },
    required: ['type', 'from', 'to'],
    additionalProperties: false
  }
  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}

/**
 * Mappings
 * @alpha
 */
export namespace MultipleMapping {
  export const schema: JSONSchema<MultipleMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: 'multiple' },
      ids: { type: 'array', items: { type: 'string', pattern: '^[0-9]+$' } }
    },
    required: ['type', 'ids'],
    additionalProperties: false
  }
  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
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
    oneOf: [SingleMapping.schema, AllMapping.schema, RangeMapping.schema, MultipleMapping.schema]
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}
