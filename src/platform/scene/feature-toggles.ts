import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

export type EnabledDisabled = 'enabled' | 'disabled'
export const toggles: EnabledDisabled[] = ['enabled', 'disabled']

export type PortableExperienceToggles = EnabledDisabled | 'hideUi'
export const portableExperienceToggles: PortableExperienceToggles[] = [...toggles, 'hideUi']

/** @alpha */
export type FeatureToggles = {
  voiceChat: EnabledDisabled
  portableExperience: EnabledDisabled | PortableExperienceToggles
}

/** @alpha */
export namespace FeatureToggles {
  export const schema: JSONSchema<FeatureToggles> = {
    type: 'object',
    properties: {
      voiceChat: {
        type: 'string',
        enum: toggles,
        nullable: true
      },
      portableExperience: {
        type: 'string',
        enum: portableExperienceToggles,
        nullable: true,
        errorMessage: `valid options are ${portableExperienceToggles.join(', ')}`
      }
    },
    errorMessage: `valid options are ${toggles.join(', ')}`,
    required: []
  }

  export const validate: ValidateFunction<FeatureToggles> = generateLazyValidator(schema)
}
