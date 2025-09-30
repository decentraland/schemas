import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../../validation'
import { EmoteDataADR74 } from '../adr74/emote-data-adr74'

export enum ArmatureId {
  Armature = 'Armature',
  Armature_Prop = 'Armature_Prop',
  Armature_Other = 'Armature_Other'
}

export namespace ArmatureId {
  export const schema: JSONSchema<ArmatureId> = {
    type: 'string',
    enum: Object.values(ArmatureId)
  }

  export const validate: ValidateFunction<ArmatureId> = generateLazyValidator(schema)
}

export type EmoteClip = {
  animation: string // GLB clip name (e.g., "HighFive_Avatar")
  sound?: string // Sound clip name (e.g., "HighFive_Avatar.ogg")
}

export namespace EmoteClip {
  export const schema: JSONSchema<EmoteClip> = {
    type: 'object',
    properties: {
      animation: {
        type: 'string',
        minLength: 1
      },
      sound: {
        type: 'string',
        nullable: true
      }
    },
    required: ['animation'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteClip> = generateLazyValidator(schema)
}

export type StartAnimation = {
  loop: boolean
  [ArmatureId.Armature]: EmoteClip
  [ArmatureId.Armature_Prop]?: EmoteClip
}

export namespace StartAnimation {
  export const schema: JSONSchema<StartAnimation> = {
    type: 'object',
    properties: {
      loop: {
        type: 'boolean'
      },
      [ArmatureId.Armature]: EmoteClip.schema,
      [ArmatureId.Armature_Prop]: {
        ...EmoteClip.schema,
        nullable: true
      }
    },
    required: ['loop', ArmatureId.Armature],
    additionalProperties: true
  }
}

export type OutcomeGroup = {
  title: string
  loop: boolean
  clips: Partial<Record<ArmatureId, EmoteClip>>
}

export namespace OutcomeGroup {
  export const schema: JSONSchema<OutcomeGroup> = {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        minLength: 1
      },
      loop: {
        type: 'boolean'
      },
      clips: {
        type: 'object',
        properties: Object.values(ArmatureId).reduce((properties, armature) => {
          properties[armature as ArmatureId] = {
            ...EmoteClip.schema,
            nullable: true
          }
          return properties
        }, {} as Record<ArmatureId, typeof EmoteClip.schema & { nullable: true }>),
        additionalProperties: true,
        minProperties: 1
      }
    },
    required: ['title', 'loop', 'clips'],
    additionalProperties: false
  }

  export const validate: ValidateFunction<OutcomeGroup> = generateLazyValidator(schema)
}

export type EmoteDataADR287 = EmoteDataADR74 & {
  startAnimation: StartAnimation
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
      startAnimation: StartAnimation.schema,
      randomizeOutcomes: {
        type: 'boolean'
      },
      outcomes: {
        type: 'array',
        items: OutcomeGroup.schema,
        minItems: 1,
        maxItems: 3
      }
    },
    required: [...EmoteDataADR74.schema.required, 'startAnimation', 'randomizeOutcomes', 'outcomes'],
    additionalProperties: true
  }

  export const validate: ValidateFunction<EmoteDataADR287> = generateLazyValidator(schema)
}
