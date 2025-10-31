import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { FuncKeywordDefinition, KeywordDefinition } from 'ajv'

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
 * Network
 * @alpha
 */
export enum ContractNetwork {
  MAINNET = 'mainnet',
  MATIC = 'matic',
  SEPOLIA = 'sepolia',
  AMOY = 'amoy'
}

/**
 * ContractAddress
 * @alpha
 */
export type ContractAddress = string

/**
 * Mappings
 * @alpha
 */
export type Mappings = Partial<Record<ContractNetwork, Record<ContractAddress, Mapping[]>>>

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
  export const _fromLessThanOrEqualTo: KeywordDefinition = {
    keyword: '_fromLessThanOrEqualTo',
    validate: function validate(schema: boolean, data: any) {
      if (!data || !data.from || !data.to) {
        return false
      }

      let { to, from } = data
      if (typeof from !== 'bigint' || typeof to !== 'bigint') {
        from = BigInt(from)
        to = BigInt(to)
      }

      return from <= to
    },
    errors: false
  }

  export const schema: JSONSchema<RangeMapping> = {
    type: 'object',
    properties: {
      type: { type: 'string', const: MappingType.RANGE },
      from: { type: 'string', pattern: '^[0-9]+$' },
      to: { type: 'string', pattern: '^[0-9]+$' }
    },
    required: ['type', 'from', 'to'],
    additionalProperties: false,
    _fromLessThanOrEqualTo: true
  }

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema, [_fromLessThanOrEqualTo])
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
 * Mapping
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

  export const validate: ValidateFunction<Mapping> = generateLazyValidator(schema, [
    RangeMapping._fromLessThanOrEqualTo
  ])
}

/**
 * Mappings
 * @alpha
 */
export namespace Mappings {
  export const _isMappingsValid: FuncKeywordDefinition = {
    keyword: '_isMappingsValid',
    validate: function (_schema: boolean, data: Mappings) {
      try {
        createMappingsHelper(data)
      } catch (_) {
        return false
      }
      return true
    },
    errors: false
  }

  export const innerSchema: JSONSchema<Record<ContractAddress, Mapping[]>> = {
    type: 'object',
    patternProperties: {
      '^0x[0-9a-fA-F]{40}$': {
        type: 'array',
        items: Mapping.schema
      }
    },
    minProperties: 1,
    required: [],
    additionalProperties: false
  }

  const properties = Object.values(ContractNetwork).reduce((acc, network) => {
    acc[network] = innerSchema
    return acc
  }, {} as any)

  export const schema: JSONSchema<Mappings> = {
    type: 'object',
    properties,
    minProperties: 1,
    additionalProperties: false,
    _isMappingsValid: true
  }

  export const validate: ValidateFunction<Mappings> = generateLazyValidator(schema, [
    RangeMapping._fromLessThanOrEqualTo,
    _isMappingsValid
  ])
}

export type MappingsHelper = {
  getMappings(): Mappings
  addMapping(network: ContractNetwork, contractAddress: ContractAddress, mapping: Mapping): void
  includesNft(network: ContractNetwork, contractAddress: ContractAddress, tokenId: string): boolean
}

export class AddMappingError extends Error {
  constructor(message: string, public existingMapping: Mapping, public conflictingMapping: Mapping) {
    super(message)
  }
}

export function createMappingsHelper(initial: Mappings = {}): MappingsHelper {
  const mappings: Mappings = {}

  for (const [network, contracts] of Object.entries(initial)) {
    mappings[network as ContractNetwork] = {}
    for (const [contractAddress, mappingsArray] of Object.entries(contracts)) {
      for (const mapping of mappingsArray) {
        // We add them this way to make sure we build a valid object
        addMapping(network as ContractNetwork, contractAddress, mapping)
      }
    }
  }

  function getMappings(): Mappings {
    return JSON.parse(JSON.stringify(mappings))
  }

  function isInRange(id: string, from: string, to: string): boolean {
    const idBigInt = BigInt(id)
    return idBigInt >= BigInt(from) && idBigInt <= BigInt(to)
  }

  function singleOverlapCheck(mapping: SingleMapping, other: Exclude<Mapping, AnyMapping>): boolean {
    switch (other.type) {
      case MappingType.SINGLE:
        return mapping.id === other.id
      case MappingType.MULTIPLE:
        return other.ids.includes(mapping.id)
      case MappingType.RANGE:
        return isInRange(mapping.id, other.from, other.to)
      default:
        return false
    }
  }

  function multipleOverlapCheck(mapping: MultipleMapping, other: Exclude<Mapping, AnyMapping>): boolean {
    switch (other.type) {
      case MappingType.SINGLE:
        return mapping.ids.includes(other.id)
      case MappingType.MULTIPLE:
        return mapping.ids.some((id) => other.ids.includes(id))
      case MappingType.RANGE:
        return mapping.ids.some((id) => isInRange(id, other.from, other.to))
      default:
        return false
    }
  }

  function rangeOverlapCheck(mapping: RangeMapping, other: Exclude<Mapping, AnyMapping>): boolean {
    switch (other.type) {
      case MappingType.SINGLE:
        return isInRange(other.id, mapping.from, mapping.to)
      case MappingType.MULTIPLE:
        return other.ids.some((id) => isInRange(id, mapping.from, mapping.to))
      case MappingType.RANGE:
        return BigInt(mapping.from) <= BigInt(other.to) && BigInt(mapping.to) >= BigInt(other.from)
    }
  }

  function overlappingCheck(mapping: Mapping, other: Mapping): boolean {
    if (mapping.type === MappingType.ANY || other.type === MappingType.ANY) {
      return true
    }

    switch (mapping.type) {
      case MappingType.SINGLE:
        return singleOverlapCheck(mapping, other)
      case MappingType.MULTIPLE:
        return multipleOverlapCheck(mapping, other)
      case MappingType.RANGE:
        return rangeOverlapCheck(mapping, other)
    }
  }

  function addMapping(network: ContractNetwork, contractAddress: ContractAddress, mapping: Mapping) {
    const lowerContractAddress = contractAddress.toLowerCase()
    mappings[network] = mappings[network] ?? {}
    mappings[network]![lowerContractAddress] = mappings[network]![lowerContractAddress] ?? []

    for (const existingMapping of mappings[network]![lowerContractAddress]) {
      if (overlappingCheck(existingMapping, mapping)) {
        throw new AddMappingError(
          `Cannot add mapping to contract ${lowerContractAddress} on network ${network} because it overlaps with existing mapping`,
          existingMapping,
          mapping
        )
      }
    }

    mappings[network]![lowerContractAddress].push(mapping)
  }

  function includesNft(network: ContractNetwork, contractAddress: ContractAddress, tokenId: string): boolean {
    if (!mappings[network]?.[contractAddress]) {
      return false
    }

    return mappings[network]![contractAddress].some((mapping) => {
      switch (mapping.type) {
        case MappingType.SINGLE:
          return mapping.id === tokenId
        case MappingType.ANY:
          return true
        case MappingType.MULTIPLE:
          return mapping.ids.includes(tokenId)
        case MappingType.RANGE:
          return BigInt(tokenId) >= BigInt(mapping.from) && BigInt(tokenId) <= BigInt(mapping.to)
      }
    })
  }

  return {
    addMapping,
    getMappings,
    includesNft
  }
}
