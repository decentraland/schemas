import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { isInExceptionBlock } from './parcel-exceptions'
import { KeywordDefinition } from 'ajv'

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
 * Namespace with utilities to validate parcels
 * @public
 */
export namespace Parcel {
  /**
   * Custom validation to check if coordinates are within limits
   */
  export const _isInLimits: KeywordDefinition = {
    keyword: '_isInLimits',
    validate: function validate(schema: boolean, data: Parcel) {
      if (!data || typeof data.x !== 'number' || typeof data.y !== 'number') {
        return false
      }

      return isInStandardBounds(data) || isInExceptionBlock(data.x, data.y)
    },
    errors: false
  }

  export const schema = {
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

  export const validate: ValidateFunction<Parcel> = generateLazyValidator(schema, [_isInLimits])

  // Converts coordinates to string in "x,y" format
  export function parcelToString({ x, y }: Parcel): string {
    return `${x},${y}`
  }

  // Converts a string in "x,y" format to a Parcel object
  export function stringToParcel(position: string): Parcel | null {
    const match = position.match(/^(-?\d+),(-?\d+)$/)
    if (!match) return null

    const [, xStr, yStr] = match
    const x = parseInt(xStr, 10)
    const y = parseInt(yStr, 10)

    return { x, y }
  }

  /**
   * Validates if a string in "x,y" format represents a valid parcel
   */
  export function isParcelStringValid(parcelString: string): boolean {
    const parcel = stringToParcel(parcelString)
    if (!parcel) return false
    return validate(parcel)
  }

  /**
   * Checks if a parcel is within the standard bounds
   */
  export function isInStandardBounds(parcel: Parcel): boolean {
    const { x, y } = parcel
    return x >= PARCEL_LIMITS.minX && x <= PARCEL_LIMITS.maxX && y >= PARCEL_LIMITS.minY && y <= PARCEL_LIMITS.maxY
  }

  /**
   * Checks if a parcel is a known exception
   */
  export function isExceptionParcel(parcel: Parcel): boolean {
    return isInExceptionBlock(parcel.x, parcel.y)
  }

  /**
   * Checks if a parcel is within bounds or is a valid exception
   */
  export function isInBounds(parcel: Parcel): boolean {
    return isInStandardBounds(parcel) || isExceptionParcel(parcel)
  }

  /**
   * Validates if a parcel is valid (satisfies the schema and is within bounds or is an exception)
   */
  export function isValid(parcel: Parcel): boolean {
    return validate(parcel)
  }

  /**
   * Validates if a parcel in string format is valid
   */
  export function isValidString(parcelString: string): boolean {
    const parcel = stringToParcel(parcelString)
    if (!parcel) return false
    return validate(parcel)
  }
}
