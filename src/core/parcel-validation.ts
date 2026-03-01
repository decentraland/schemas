import type { JSONSchema, KeywordDefinition } from '../validation/types.js'
import { isInExceptionBlock } from './parcel-exceptions.js'

/**
 * Represents a parcel with X and Y coordinates
 * @public
 */
export type Parcel = { x: number; y: number }

/**
 * Standard limits for parcels in Decentraland
 * @public
 */
export const PARCEL_LIMITS = {
  minX: -150,
  maxX: 150,
  minY: -150,
  maxY: 150
}

/**
 * Custom validation to check if coordinates are within limits
 * @public
 */
export const parcelIsInLimitsKeyword: KeywordDefinition = {
  keyword: '_isInLimits',
  validate: function validate(schema: boolean, data: Parcel) {
    if (!data || typeof data.x !== 'number' || typeof data.y !== 'number') {
      return false
    }

    return isParcelInStandardBounds(data) || isInExceptionBlock(data.x, data.y)
  },
  errors: false
}

/** @public */
export const parcelKeywordDefinitions: KeywordDefinition[] = [parcelIsInLimitsKeyword]

/** @public */
export const parcelSchema = {
  type: 'object',
  required: ['x', 'y'],
  properties: {
    x: {
      type: 'number'
    },
    y: {
      type: 'number'
    }
  },
  _isInLimits: true,
  additionalProperties: false
} as JSONSchema<Parcel>

/** Converts coordinates to string in "x,y" format */
export function parcelToString({ x, y }: Parcel): string {
  return `${x},${y}`
}

/** Converts a string in "x,y" format to a Parcel object */
export function stringToParcel(position: string): Parcel | null {
  const match = position.match(/^(-?\d+),(-?\d+)$/)
  if (!match) return null

  const [, xStr, yStr] = match
  const x = parseInt(xStr, 10)
  const y = parseInt(yStr, 10)

  return { x, y }
}

/**
 * Checks if a parcel is within the standard bounds
 * @public
 */
export function isParcelInStandardBounds(parcel: Parcel): boolean {
  const { x, y } = parcel
  return x >= PARCEL_LIMITS.minX && x <= PARCEL_LIMITS.maxX && y >= PARCEL_LIMITS.minY && y <= PARCEL_LIMITS.maxY
}

/**
 * Checks if a parcel is a known exception
 * @public
 */
export function isExceptionParcel(parcel: Parcel): boolean {
  return isInExceptionBlock(parcel.x, parcel.y)
}

/**
 * Checks if a parcel is within bounds or is a valid exception
 * @public
 */
export function isParcelInBounds(parcel: Parcel): boolean {
  return isParcelInStandardBounds(parcel) || isExceptionParcel(parcel)
}

/**
 * Validates if a parcel is valid (within bounds or is an exception)
 * @public
 */
export function isParcelValid(parcel: Parcel): boolean {
  if (!parcel || typeof parcel.x !== 'number' || typeof parcel.y !== 'number') {
    return false
  }
  return isParcelInBounds(parcel)
}

/**
 * Validates if a string in "x,y" format represents a valid parcel
 * @public
 */
export function isParcelStringValid(parcelString: string): boolean {
  const parcel = stringToParcel(parcelString)
  if (!parcel) return false
  return isParcelValid(parcel)
}

/**
 * Validates if a parcel in string format is valid
 * @public
 */
export function isParcelValidString(parcelString: string): boolean {
  const parcel = stringToParcel(parcelString)
  if (!parcel) return false
  return isParcelValid(parcel)
}
