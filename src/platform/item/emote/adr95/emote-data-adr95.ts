import { EmoteCategory } from '../../../../dapps/emote-category'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../../validation'
import { EmoteRepresentationADR73 } from './representation-adr95'

export type EmoteDataADR73 = {
  category: EmoteCategory
  representations: EmoteRepresentationADR73[]
  tags: string[]
}

export namespace EmoteDataADR73 {
  export const schema: JSONSchema<EmoteDataADR73> = {
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
        items: EmoteRepresentationADR73.schema,
        minItems: 1
      },
      category: EmoteCategory.schema
    },
    required: ['category', 'tags', 'representations'] as any[],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR73> =
    generateValidator(schema)
}
