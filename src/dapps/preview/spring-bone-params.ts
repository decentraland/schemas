import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

/** @alpha */
export type SpringBoneParams = {
  stiffness: number
  gravityPower: number
  gravityDir: [number, number, number]
  drag: number
  center?: string
}

/** @alpha */
export namespace SpringBoneParams {
  export const schema: JSONSchema<SpringBoneParams> = {
    type: 'object',
    properties: {
      stiffness: { type: 'number', minimum: 0, maximum: 5 },
      gravityPower: { type: 'number', minimum: 0, maximum: 10 },
      gravityDir: {
        type: 'array',
        items: [{ type: 'number' }, { type: 'number' }, { type: 'number' }],
        minItems: 3,
        maxItems: 3
      },
      drag: { type: 'number', minimum: 0, maximum: 1 },
      center: { type: 'string', nullable: true }
    },
    required: ['stiffness', 'gravityPower', 'gravityDir', 'drag']
  }

  export const validate: ValidateFunction<SpringBoneParams> = generateLazyValidator(schema)
}
