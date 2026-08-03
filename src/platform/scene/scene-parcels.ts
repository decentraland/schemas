import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

const PARCEL_COORDINATE_PATTERN = '^(?:0|-?[1-9][0-9]*),(?:0|-?[1-9][0-9]*)$'

/** @alpha */
export type SceneParcels = {
  base: string
  parcels: string[]
}

/** @alpha */
export namespace SceneParcels {
  export const schema: JSONSchema<SceneParcels> = {
    description:
      'Describes a scene, a set of parcels whose content is treated as the same entity. A list of parcels is listed, for which one of them is considered the "base" for positioning purposes.',
    type: 'object',
    properties: {
      base: {
        type: 'string',
        pattern: PARCEL_COORDINATE_PATTERN
      },
      parcels: {
        type: 'array',
        items: {
          type: 'string',
          pattern: PARCEL_COORDINATE_PATTERN
        },
        minItems: 1,
        uniqueItems: true
      }
    },
    additionalProperties: true,
    required: ['base', 'parcels']
  }

  export const schemaValidator: ValidateFunction<SceneParcels> = generateLazyValidator(schema)
  export const validate: ValidateFunction<SceneParcels> = (sceneParcels: any): sceneParcels is SceneParcels =>
    schemaValidator(sceneParcels) && sceneParcels.parcels.includes(sceneParcels.base)
}
