import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'
import { isOutOfBoundsParcel } from './parcel-exceptions'

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
  export const schema: JSONSchema<Parcel> = {
    type: 'object',
    required: ['x', 'y'],
    properties: {
      x: {
        type: 'number'
      },
      y: {
        type: 'number'
      }
    }
  }

  const schemaValidator: ValidateFunction<Parcel> = generateLazyValidator(schema)

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
   * Validates if x,y coordinates form a valid parcel according to the schema
   */
  export const validate: ValidateFunction<Parcel> = (parcel: any): parcel is Parcel => {
    return schemaValidator(parcel)
  }

  /**
   * Validates if a string in "x,y" format represents a valid parcel
   */
  export function validateParcelString(parcelString: string): boolean {
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
    const parcelString = parcelToString(parcel)
    return isOutOfBoundsParcel(parcelString)
  }

  /**
   * Checks if a parcel is within bounds or is a valid exception
   */
  export function isInBounds(parcel: Parcel): boolean {
    return isInStandardBounds(parcel) || isExceptionParcel(parcel)
  }

  /**
   * Checks if a string in "x,y" format is within bounds or is an exception
   */
  export function isInBoundsString(parcelString: string): boolean {
    // Quick check for exceptions
    if (isOutOfBoundsParcel(parcelString)) return true

    const parcel = stringToParcel(parcelString)
    if (!parcel) return false
    return isInStandardBounds(parcel)
  }

  /**
   * Validates if a parcel is valid (satisfies the schema and is within bounds or is an exception)
   */
  export function isValid(parcel: Parcel): boolean {
    return validate(parcel) && (isInStandardBounds(parcel) || isExceptionParcel(parcel))
  }

  /**
   * Validates if a parcel in string format is valid
   */
  export function isValidString(parcelString: string): boolean {
    // Quick check for exceptions
    if (isOutOfBoundsParcel(parcelString)) return true

    const parcel = stringToParcel(parcelString)
    if (!parcel) return false
    return validate(parcel) && isInStandardBounds(parcel)
  }
}
