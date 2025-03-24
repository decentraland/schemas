/**
 * Known exceptions of parcels that are outside the standard limits
 * but are valid in Decentraland
 * @internal
 */

/**
 * Block 1: Northern border (X=62-150, Y=151-158)
 *
 * Simplified to a rectangular region:
 *
 *         X=62 to X=150
 *         ↓      ↓
 * Y=158 → █ █ █ █...█ █ █ █
 * Y=... → █ █ █ █...█ █ █ █
 * Y=152 → █ █ █ █...█ █ █ █
 * Y=151 → █ █ █ █...█ █ █ █
 */
function isInBlock1(x: number, y: number): boolean {
  // Simplified to a single rectangle X=62-150, Y=151-158
  return x >= 62 && x <= 150 && y >= 151 && y <= 158
}

/**
 * Block 2: Northeastern region (X=151-162, Y=144-158)
 *
 * Simplified to a rectangular region:
 *
 *         X=151 to X=162
 *         ↓      ↓
 * Y=158 → █ █ █ █...█ █ █ █
 * Y=... → █ █ █ █...█ █ █ █
 * Y=145 → █ █ █ █...█ █ █ █
 * Y=144 → █ █ █ █...█ █ █ █
 */
function isInBlock2(x: number, y: number): boolean {
  // Simplified to a single rectangle X=151-162, Y=144-158
  return x >= 151 && x <= 162 && y >= 144 && y <= 158
}

/**
 * Block 3: Eastern border (X=151-163, Y=59-143)
 *
 * Simplified to a rectangular region:
 *
 *         X=151 to X=163
 *         ↓      ↓
 * Y=143 → █ █ █ █...█ █ █ █
 * Y=... → █ █ █ █...█ █ █ █
 * Y=60 →  █ █ █ █...█ █ █ █
 * Y=59 →  █ █ █ █...█ █ █ █
 */
function isInBlock3(x: number, y: number): boolean {
  // Simplified to a single rectangle X=151-163, Y=59-143
  return x >= 151 && x <= 163 && y >= 59 && y <= 143
}

/**
 * Checks if a coordinate is in any exception block
 * @param x X coordinate of the parcel
 * @param y Y coordinate of the parcel
 * @returns true if the parcel is in any exception block
 */
function isInExceptionBlock(x: number, y: number): boolean {
  return isInBlock1(x, y) || isInBlock2(x, y) || isInBlock3(x, y)
}

/**
 * Description of parcel exceptions organized in three logical blocks:
 * - Block 1: Coordinates X=62-150, Y=151-158. These are parcels along the northern border where Y exceeds the standard maximum of 150.
 * - Block 2: Coordinates X=151-162, Y=144-158. These are parcels in the northeastern region of the map.
 * - Block 3: Coordinates X=151-163, Y=59-143. These are parcels on the eastern border where X exceeds the standard maximum of 150.
 * @internal
 */

/**
 * Checks if a parcel string is in the exceptions list of out-of-bounds but valid parcels
 * @public
 */
export function isOutOfBoundsParcel(parcelString: string): boolean {
  // Parse the coordinates
  const [x, y] = parcelString.split(',').map(Number)

  // If x or y are not valid numbers, it's not an exception parcel
  if (isNaN(x) || isNaN(y)) {
    return false
  }

  // Check if the parcel is in any of the exception blocks
  return isInExceptionBlock(x, y)
}
