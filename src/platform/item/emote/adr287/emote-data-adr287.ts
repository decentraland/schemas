import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../../validation'

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
}

export namespace EmoteClip {
  export const schema: JSONSchema<EmoteClip> = {
    type: 'object',
    properties: {
      animation: {
        type: 'string',
        minLength: 1,
        errorMessage: 'animation must be a non-empty string (GLB clip name)'
      }
    },
    required: ['animation'],
    additionalProperties: false,
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
  audio?: string
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
      },
      audio: {
        type: 'string',
        nullable: true,
        errorMessage: 'audio must be a string (audio clip filename) when provided'
      }
    },
    required: ['loop', ArmatureId.Armature],
    additionalProperties: false,
    errorMessage: {
      required: {
        loop: 'startAnimation.loop is required',
        [ArmatureId.Armature]: 'startAnimation.Armature is required'
      }
    }
  }

  export const validate: ValidateFunction<StartAnimation> = generateLazyValidator(schema)
}

export type OutcomeGroup = {
  title: string
  loop: boolean
  clips: Partial<Record<ArmatureId, EmoteClip>>
  audio?: string
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
      },
      audio: {
        type: 'string',
        nullable: true,
        errorMessage: 'audio must be a string (audio clip filename) when provided'
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
