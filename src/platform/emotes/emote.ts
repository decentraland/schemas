import {
  generateValidator,
  JSONSchema,
  ValidateFunction
} from '../../validation'
import { Rarity } from '../../dapps/rarity'
import { I18N } from '../common'
import { EmoteRepresentation } from './representation'
import { EmoteData } from './data'

/** @alpha */
export type Emote = {
  id: string
  version: string
  names: I18N[]
  descriptions: I18N[]
  collectionAddress: string
  rarity: Rarity
  tags: string[]
  contents: string[]
  data: EmoteData
  representations: EmoteRepresentation[]
}

/** @alpha */
export namespace Emote {
  export const schema: JSONSchema<Emote> = {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        nullable: false
      },
      version: {
        type: 'string',
        nullable: false
      },
      names: {
        type: 'array',
        items: I18N.schema,
        minItems: 1
      },
      descriptions: {
        type: 'array',
        items: I18N.schema,
        minItems: 1
      },
      collectionAddress: {
        type: 'string'
      },
      rarity: Rarity.schema,
      tags: {
        type: 'array',
        items: {
          type: 'string',
          minLength: 1
        }
      },
      contents: {
        type: 'array',
        items: {
          type: 'string'
        },
        minItems: 1,
        uniqueItems: true
      },
      data: EmoteData.schema,
      representations: {
        type: 'array',
        items: EmoteRepresentation.schema,
        minItems: 1
      }
    },
    additionalProperties: false,
    required: [
      'id',
      'version',
      'names',
      'descriptions',
      'collectionAddress',
      'rarity',
      'contents',
      'data',
      'representations'
    ]
  }

  const schemaValidator: ValidateFunction<Emote> = generateValidator(schema)
  export const validate: ValidateFunction<Emote> = (
    emote: any
  ): emote is Emote =>
    schemaValidator(emote) &&
    validateDuplicatedLocales(emote.descriptions) &&
    validateDuplicatedLocales(emote.names) &&
    validateRepresentationFiles(emote.representations, emote.contents)

  // Returns true only if there are no entries with the same locale
  const validateDuplicatedLocales = (i18ns: I18N[]) =>
    i18ns.every(
      ({ code }, index) =>
        i18ns.findIndex((i18n) => i18n.code === code) === index
    )

  const validateRepresentationFiles = (
    representations: EmoteRepresentation[],
    contents: string[]
  ) =>
    representations.every((representation) =>
      contents.includes(representation.mainFile)
    )
}
