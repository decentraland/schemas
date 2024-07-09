import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/**
 * MappingType
 * @alpha
 */
export enum MappingType {
  SINGLE = 'single',
  ANY = 'any',
  MULTIPLE = 'multiple',
  RANGE = 'range'
}

/**
 * Mapping
 * @alpha
 */
export type Mapping = SingleMapping | AnyMapping | RangeMapping | MultipleMapping

/**
 * SingleMapping
 * @alpha
 */
export type SingleMapping = {
  type: MappingType.SINGLE
  id: string
}

/**
 * AnyMapping
 * @alpha
 */
export type AnyMapping = {
  type: MappingType.ANY
}

/**
 * RangeMapping
 * @alpha
 */
export type RangeMapping = {
  type: MappingType.RANGE
  from: string
  to: string
}

/**
 * MultipleMapping
 * @alpha
 */
export type MultipleMapping = {
  type: MappingType.MULTIPLE
  ids: string[]
}

/**
 * SingleMapping
 * @alpha
 */
export namespace SingleMapping {
  export const schema: JSONSchema<SingleMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: MappingType.SINGLE },
      id: { type: 'string', pattern: '^[0-9]+$' }
    },
    required: ['type', 'id'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}

/**
 * AnyMapping
 * @alpha
 */
export namespace AnyMapping {
  export const schema: JSONSchema<AnyMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: MappingType.ANY }
    },
    required: ['type'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}

/**
 * RangeMapping
 * @alpha
 */
export namespace RangeMapping {
  export const schema: JSONSchema<RangeMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: MappingType.RANGE },
      from: { type: 'string', pattern: '^[0-9]+$' },
      to: { type: 'string', pattern: '^[0-9]+$' }
    },
    required: ['type', 'from', 'to'],
    additionalProperties: false
  }
  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}

/**
 * MultipleMapping
 * @alpha
 */
export namespace MultipleMapping {
  export const schema: JSONSchema<MultipleMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: MappingType.MULTIPLE },
      ids: {
        type: 'array',
        items: {
          type: 'string',
          pattern: '^[0-9]+$'
        },
        minItems: 1,
        uniqueItems: true
      }
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
        enum: Object.values(MappingType)
      }
    },
    required: ['type'],
    oneOf: [SingleMapping.schema, AnyMapping.schema, RangeMapping.schema, MultipleMapping.schema]
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema)
}
