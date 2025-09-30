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
        minLength: 1,
        errorMessage: 'animation must be a non-empty string (GLB clip name)'
      },
      sound: {
        type: 'string',
        nullable: true,
        errorMessage: 'sound must be a string (sound clip name) when provided'
      }
    },
    required: ['animation'],
    additionalProperties: true,
    errorMessage: {
      required: {
        animation: 'animation is required (GLB clip name)'
      }
    }
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
        type: 'boolean',
        errorMessage: 'startAnimation.loop must be a boolean'
      },
      [ArmatureId.Armature]: {
        ...EmoteClip.schema,
        errorMessage: 'startAnimation.Armature is required and must contain valid animation data'
      },
      [ArmatureId.Armature_Prop]: {
        ...EmoteClip.schema,
        nullable: true,
        errorMessage: 'startAnimation.Armature_Prop must contain valid animation data when provided'
      }
    },
    required: ['loop', ArmatureId.Armature],
    additionalProperties: true,
    errorMessage: {
      required: {
        loop: 'startAnimation.loop is required',
        [ArmatureId.Armature]: 'startAnimation.Armature is required'
      }
    }
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
        minLength: 1,
        errorMessage: 'outcome.title must be a non-empty string'
      },
      loop: {
        type: 'boolean',
        errorMessage: 'outcome.loop must be a boolean'
      },
      clips: {
        type: 'object',
        properties: Object.values(ArmatureId).reduce((properties, armature) => {
          properties[armature as ArmatureId] = {
            ...EmoteClip.schema,
            nullable: true,
            errorMessage: `outcome.clips.${armature} must contain valid animation data when provided`
          }
          return properties
        }, {} as Record<ArmatureId, typeof EmoteClip.schema & { nullable: true }>),
        additionalProperties: true,
        minProperties: 1,
        errorMessage: 'outcome.clips must contain at least one armature animation'
      }
    },
    required: ['title', 'loop', 'clips'],
    additionalProperties: false,
    errorMessage: {
      required: {
        title: 'outcome.title is required',
        loop: 'outcome.loop is required',
        clips: 'outcome.clips is required'
      }
    }
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
      startAnimation: {
        ...StartAnimation.schema,
        errorMessage: 'emoteDataADR287.startAnimation is required and must contain valid start animation data'
      },
      randomizeOutcomes: {
        type: 'boolean',
        errorMessage: 'emoteDataADR287.randomizeOutcomes must be a boolean'
      },
      outcomes: {
        type: 'array',
        items: OutcomeGroup.schema,
        minItems: 1,
        maxItems: 3,
        errorMessage: 'emoteDataADR287.outcomes must be an array with 1-3 outcome groups'
      }
    },
    required: [...EmoteDataADR74.schema.required, 'startAnimation', 'randomizeOutcomes', 'outcomes'],
    additionalProperties: true,
    errorMessage: {
      required: {
        startAnimation: 'emoteDataADR287.startAnimation is required for ADR287 emotes',
        randomizeOutcomes: 'emoteDataADR287.randomizeOutcomes is required for ADR287 emotes',
        outcomes: 'emoteDataADR287.outcomes is required for ADR287 emotes'
      }
    }
  }

  export const validate: ValidateFunction<EmoteDataADR287> = generateLazyValidator(schema)
}
