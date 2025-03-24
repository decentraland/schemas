/**
 * Known exceptions of parcels that are outside the standard limits
 * but are valid in Decentraland
 * @internal
 */

// Import exception data from TS data file
import { block_1, block_2, block_3 } from './parcel-exceptions-data'

// Create a flat array with all exception coordinates
const allExceptions = [...block_1, ...block_2, ...block_3]

/**
 * Set of parcel coordinates that are exceptions to the standard limits.
 * These parcels are organized in three blocks:
 * - block_1: Coordinates X=151-163, Y=59-143. These are parcels on the eastern border where X exceeds the standard maximum of 150.
 * - block_2: Coordinates X=151-162, Y=144-150. These are parcels in the northeastern region of the map.
 * - block_3: Coordinates X=62-162, Y=151-158. These are parcels along the northern border where Y exceeds the standard maximum of 150.
 * @internal
 */
export const PARCEL_EXCEPTIONS: Set<string> = new Set(allExceptions)

/**
 * Checks if a parcel string is in the exceptions list of out-of-bounds but valid parcels
 * @public
 */
export function isOutOfBoundsParcel(parcelString: string): boolean {
  return PARCEL_EXCEPTIONS.has(parcelString)
}
