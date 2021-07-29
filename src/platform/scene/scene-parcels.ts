import { generateValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type SceneParcels = {
  base: string;
  parcels: string[];
}

/** @alpha */
export namespace SceneParcels {
  export const schema: JSONSchema<SceneParcels> = {
    type: 'object',
    properties: {
      base: {
        type: 'string',
        pattern: "^-?[0-9]+,-?[0-9]+$"
      },
      parcels: {
        type: 'array',
        items: {
          type: 'string',
          pattern: "^-?[0-9]+,-?[0-9]+$"
        },
        minItems: 1
      },
    },
    additionalProperties: false,
    required: ['base', 'parcels'],
  }

  export const schemaValidator: ValidateFunction<SceneParcels> = generateValidator(schema)
  export const validate: ValidateFunction<SceneParcels> = (sceneParcels: any): sceneParcels is SceneParcels =>
    schemaValidator(sceneParcels) &&
    sceneParcels.parcels.includes(sceneParcels.base)
}


