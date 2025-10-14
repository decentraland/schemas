import { EmoteCategory } from '../emote-category'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../../validation'
import { EmoteRepresentationADR74 } from './representation-adr74'
import { OutcomeGroup, StartAnimation } from '../adr287/emote-data-adr287'

export type EmoteDataADR74 = {
  category: EmoteCategory
  representations: EmoteRepresentationADR74[]
  tags: string[]
  loop: boolean
  startAnimation?: StartAnimation
  randomizeOutcomes?: boolean
  outcomes?: OutcomeGroup[]
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
      category: EmoteCategory.schema,
      loop: {
        type: 'boolean'
      },
      startAnimation: {
        ...StartAnimation.schema,
        nullable: true
      },
      randomizeOutcomes: {
        type: 'boolean',
        nullable: true
      },
      outcomes: {
        type: 'array',
        items: OutcomeGroup.schema,
        minItems: 1,
        maxItems: 3,
        nullable: true
      }
    },
    required: ['category', 'tags', 'representations', 'loop'] as any[],
    dependencies: {
      startAnimation: ['randomizeOutcomes', 'outcomes'],
      randomizeOutcomes: ['startAnimation', 'outcomes'],
      outcomes: ['startAnimation', 'randomizeOutcomes']
    },
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR74> = generateLazyValidator(schema)
}
