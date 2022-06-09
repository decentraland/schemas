import { EmoteCategory } from '../emote-category'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../../validation'
import { EmoteRepresentationADR74 } from './representation-adr74'

export type EmoteDataADR74 = {
  category: EmoteCategory
  representations: EmoteRepresentationADR74[]
  tags: string[]
}

export namespace EmoteDataADR74 {
  export const schema: JSONSchema<EmoteDataADR74> = {
    type: 'object',
    properties: {
      tags: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 1
        }
      },
      representations: {
        type: 'array',
        items: EmoteRepresentationADR74.schema,
        minItems: 1
      },
      category: EmoteCategory.schema
    },
    required: ['category', 'tags', 'representations'] as any[],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR74> =
    generateValidator(schema)
}
