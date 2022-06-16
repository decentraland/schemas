import { DisplayableDeployment } from '../shared/displayable'
import { I18N } from './i18n'
import { Metrics } from './metrics'
import { displayableProperties } from '../shared/displayable'

/**
 * @public
 *
 * Describes common properties to an item of a collection.
 */
export type BaseItem = DisplayableDeployment & {
  id: string
  name: string
  description: string
  i18n: I18N[]
  thumbnail: string
  image: string
  metrics?: Metrics
}

// @internal
export const baseItemProperties = {
  ...displayableProperties,
  id: {
    type: 'string'
  },
  name: {
    type: 'string'
  },
  description: {
    type: 'string'
  },
  i18n: {
    type: 'array',
    items: I18N.schema,
    minItems: 1,
    uniqueItemProperties: ['code'],
    errorMessage: '${0#} array should not have duplicates for "code"'
  },
  thumbnail: {
    type: 'string'
  },
  image: {
    type: 'string'
  },
  metrics: {
    ...Metrics.schema,
    nullable: true
  }
} as const

export const requiredBaseItemProps = [
  'id',
  'name',
  'description',
  'i18n',
  'thumbnail',
  'image'
] as const