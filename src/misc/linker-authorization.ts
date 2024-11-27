import { JSONSchema, ValidateFunction, generateLazyValidator } from '../validation'

/**
 * Represents a Linker-Server Authorization.
 *
 * @public
 */
export type LinkerAuthorization = {
  name: string
  desc: string
  startDate?: string
  endDate?: string
  contactInfo: {
    name: string
    [key: string]: string
  }
  onlyDev?: boolean
  addresses: string[]
  plots: string[]
}

export namespace LinkerAuthorization {
  export const schema: JSONSchema<LinkerAuthorization> = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      desc: { type: 'string' },
      startDate: { type: 'string', nullable: true },
      endDate: { type: 'string', nullable: true },
      contactInfo: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        },
        required: ['name']
      },
      onlyDev: { type: 'boolean', nullable: true },
      addresses: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1
      },
      plots: {
        type: 'array',
        items: { type: 'string' },
        minItems: 1
      }
    },
    required: ['name', 'desc', 'contactInfo', 'addresses', 'plots']
  }

  export const validate: ValidateFunction<LinkerAuthorization> = generateLazyValidator(schema)
}
