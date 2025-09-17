import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../../validation'
import { EmoteDataADR74 } from '../adr74/emote-data-adr74'

export type ArmatureId = 'Avatar' | 'Avatar_Other' | 'Avatar_Prop' | string

export namespace ArmatureId {
  export const schema: JSONSchema<ArmatureId> = {
    oneOf: [
      {
        type: 'string',
        enum: ['Avatar', 'Avatar_Other', 'Avatar_Prop']
      },
      {
        type: 'string',
        minLength: 1
      }
    ]
  }

  export const validate: ValidateFunction<ArmatureId> = generateLazyValidator(schema)
}

export type EmoteClip = {
  armature: ArmatureId // Avatar, Avatar_Other, Avatar_Prop, or any other armature name
  animation: string // GLB clip name (e.g., "HighFive_Avatar")
  loop: boolean
}

export namespace EmoteClip {
  export const schema: JSONSchema<EmoteClip> = {
    type: 'object',
    properties: {
      armature: ArmatureId.schema,
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

  export const validate: ValidateFunction<EmoteClip> = generateLazyValidator(schema)
}

export type OutcomeGroup = {
  title: string
  clips: EmoteClip[]
}

export namespace OutcomeGroup {
  export const schema: JSONSchema<OutcomeGroup> = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1
      },
      clips: {
        type: 'array',
        items: EmoteClip.schema,
        minItems: 1
      }
    },
    required: ['title', 'clips'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<OutcomeGroup> = generateLazyValidator(schema)
}

export type EmoteDataADR287 = EmoteDataADR74 & {
  startAnimation: EmoteClip
  randomizeOutcomes: boolean
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
        type: 'object',
        items: EmoteClip.schema
      },
      randomizeOutcomes: {
        type: 'boolean'
      },
      outcomes: {
        type: 'array',
        items: OutcomeGroup.schema,
        minItems: 1,
        maxItems: 4
      }
    },
    required: [...EmoteDataADR74.schema.required, 'startAnimation', 'randomizeOutcomes', 'outcomes'] as any[],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR287> = generateLazyValidator(schema)
}
