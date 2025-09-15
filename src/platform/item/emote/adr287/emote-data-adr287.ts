import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../../validation'
import { EmoteDataADR74 } from '../adr74/emote-data-adr74'

export type EmoteClip = {
  armature: string // Avatar, Avatar_Other, or any other armature name
  animation: string // GLB clip name (e.g., "HighFive_Avatar")
  loop: boolean
  randomize: boolean
}

export type OutcomeGroup = EmoteClip[]

export type EmoteDataADR287 = EmoteDataADR74 & {
  startAnimation?: Omit<EmoteClip, 'randomize'>[]
  outcomes: OutcomeGroup[]
}

export namespace EmoteDataADR287 {
  export const schema: JSONSchema<EmoteDataADR287> = {
    type: 'object',
    properties: {
      // Inherit all properties from EmoteDataADR74
      ...EmoteDataADR74.schema.properties,
      // Add ADR287-specific properties
      startAnimation: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            armature: {
              type: 'string',
              minLength: 1
            },
            animation: {
              type: 'string',
              minLength: 1
            },
            loop: {
              type: 'boolean'
            }
          },
          required: ['armature', 'animation', 'loop'],
          additionalProperties: false
        }
      },
      outcomes: {
        type: 'array',
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              armature: {
                type: 'string',
                minLength: 1
              },
              animation: {
                type: 'string',
                minLength: 1
              },
              loop: {
                type: 'boolean'
              },
              randomize: {
                type: 'boolean'
              }
            },
            required: ['armature', 'animation', 'loop', 'randomize'],
            additionalProperties: false
          },
          minItems: 1
        },
        minItems: 1
      }
    },
    required: [...EmoteDataADR74.schema.required, 'outcomes'] as any[],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR287> = generateLazyValidator(schema)
}
