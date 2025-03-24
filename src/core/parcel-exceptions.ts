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
export function isInExceptionBlock(x: number, y: number): boolean {
  return isInBlock1(x, y) || isInBlock2(x, y) || isInBlock3(x, y)
}
