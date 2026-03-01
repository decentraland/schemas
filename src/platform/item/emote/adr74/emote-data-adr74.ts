import { EmoteCategory, emoteCategorySchema } from '../emote-category.js'
import type { JSONSchema } from '../../../../validation/types.js'
import { EmoteRepresentationADR74, emoteRepresentationADR74Schema } from './representation-adr74.js'
import { OutcomeGroup, StartAnimation, outcomeGroupSchema, startAnimationSchema } from '../adr287/emote-data-adr287.js'

export type EmoteDataADR74 = {
  category: EmoteCategory
  representations: EmoteRepresentationADR74[]
  tags: string[]
  loop: boolean
  startAnimation?: StartAnimation
  randomizeOutcomes?: boolean
  outcomes?: OutcomeGroup[]
}

export const emoteDataADR74Schema: JSONSchema<EmoteDataADR74> = {
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
      items: emoteRepresentationADR74Schema,
      minItems: 1
    },
    category: emoteCategorySchema,
    loop: {
      type: 'boolean'
    },
    startAnimation: {
      ...startAnimationSchema,
      nullable: true
    },
    randomizeOutcomes: {
      type: 'boolean',
      nullable: true
    },
    outcomes: {
      type: 'array',
      items: outcomeGroupSchema,
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
