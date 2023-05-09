import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export type Store = {
  id: string // urn
  owner: string
  description: string
  links: {
    name: string
    url: string
  }[]
  images: {
    name: string
    file: string
  }[]
  version: number
}

export namespace Store {
  export const schema: JSONSchema<Store> = {
    type: 'object',
    properties: {
      id: {
        type: 'string'
      },
      version: {
        type: 'number'
      },
      owner: {
        type: 'string'
      },
      description: {
        type: 'string'
      },
      links: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            url: {
              type: 'string'
            }
          },
          required: ['name', 'url']
        }
      },
      images: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string'
            },
            file: {
              type: 'string'
            }
          },
          required: ['name', 'file']
        }
      }
    },
    required: ['id', 'version', 'owner', 'description', 'links', 'images']
  }

  export const validate: ValidateFunction<Store> = generateLazyValidator(schema)
}
