import type { JSONSchema } from '../../../../validation/types.js'

export enum ArmatureId {
  Armature = 'Armature',
  Armature_Prop = 'Armature_Prop',
  Armature_Other = 'Armature_Other'
}

export const armatureIdSchema: JSONSchema<ArmatureId> = {
  type: 'string',
  enum: Object.values(ArmatureId)
}

export type EmoteClip = {
  animation: string // GLB clip name (e.g., "HighFive_Avatar")
}

export const emoteClipSchema: JSONSchema<EmoteClip> = {
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

export type StartAnimation = {
  loop: boolean
  [ArmatureId.Armature]: EmoteClip
  [ArmatureId.Armature_Prop]?: EmoteClip
  audio?: string
}

export const startAnimationSchema: JSONSchema<StartAnimation> = {
  type: 'object',
  properties: {
    loop: {
      type: 'boolean',
      errorMessage: 'startAnimation.loop must be a boolean'
    },
    [ArmatureId.Armature]: {
      ...emoteClipSchema,
      errorMessage: 'startAnimation.Armature is required and must contain valid animation data'
    },
    [ArmatureId.Armature_Prop]: {
      ...emoteClipSchema,
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

export type OutcomeGroup = {
  title: string
  loop: boolean
  clips: Partial<Record<ArmatureId, EmoteClip>>
  audio?: string
}

export const outcomeGroupSchema: JSONSchema<OutcomeGroup> = {
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
      properties: ([ArmatureId.Armature, ArmatureId.Armature_Prop, ArmatureId.Armature_Other] as const).reduce(
        (properties, armature) => {
          properties[armature] = {
            ...emoteClipSchema,
            nullable: true,
            errorMessage: `outcome.clips.${armature} must contain valid animation data when provided`
          }
          return properties
        },
        {} as Record<string, any>
      ),
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
