import { EmoteCategory } from '../../../../dapps/emote-category'
import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../../../validation'
import { EmoteRepresentationADR95 } from './representation-adr95'

export type EmoteDataADR95 = {
  category: EmoteCategory
  representations: EmoteRepresentationADR95[]
  tags: string[]
}

export namespace EmoteDataADR95 {
  export const schema: JSONSchema<EmoteDataADR95> = {
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
        items: EmoteRepresentationADR95.schema,
        minItems: 1
      },
      category: EmoteCategory.schema
    },
    required: ['category', 'tags', 'representations'] as any[],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR95> =
    generateValidator(schema)
}
