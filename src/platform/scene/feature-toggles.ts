import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'

export type EnabledDisabled = 'enabled' | 'disabled'
export const toggles: EnabledDisabled[] = ['enabled', 'disabled']

export type PortableExperiencesToggles = EnabledDisabled | 'hideUi'
export const portableExperiencesToggles: PortableExperiencesToggles[] = [...toggles, 'hideUi']

/** @alpha */
export type FeatureToggles = {
  voiceChat?: EnabledDisabled
  portableExperiences?: EnabledDisabled | PortableExperiencesToggles
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
      portableExperiences: {
        type: 'string',
        enum: portableExperiencesToggles,
        nullable: true,
        errorMessage: `valid options are ${portableExperiencesToggles.join(', ')}`
      }
    },
    errorMessage: `valid options are ${toggles.join(', ')}`,
    required: []
  }

  export const validate: ValidateFunction<FeatureToggles> = generateLazyValidator(schema)
}
