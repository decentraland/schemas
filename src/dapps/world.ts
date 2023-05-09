import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

/**
 * World Range
 * @alpha
 */
export type ValidWorldRange = {
  xMin: number
  yMin: number
  xMax: number
  yMax: number
}

/**
 * World
 * @alpha
 */
export type World = {
  validWorldRanges: Array<ValidWorldRange>
}

/**
 * Get World
 * @alpha
 */
export function getWorld(): World {
  return {
    validWorldRanges: [
      {
        xMin: -150,
        yMin: -150,
        xMax: 150,
        yMax: 150
      },
      {
        xMin: 62,
        yMin: 151,
        xMax: 162,
        yMax: 158
      },
      {
        xMin: 151,
        yMin: 144,
        xMax: 162,
        yMax: 150
      },
      {
        xMin: 151,
        yMin: 59,
        xMax: 163,
        yMax: 143
      }
    ]
  }
}

/**
 * Check if is inside World Limits
 * @alpha
 */
export function isInsideWorldLimits(x: number, y: number) {
  const validWorldRanges = getWorld().validWorldRanges
  for (const range of validWorldRanges) {
    if (x >= range.xMin && x <= range.xMax && y >= range.yMin && y <= range.yMax) {
      return true
    }
  }
  return false
}

/**
 * @alpha
 */
export namespace World {
  export const schema: JSONSchema<World> = {
    type: 'object',
    required: ['validWorldRanges'],
    properties: {
      validWorldRanges: {
        type: 'array',
        default: [
          {
            xMin: -150,
            yMin: -150,
            xMax: 150,
            yMax: 150
          }
        ],
        items: {
          type: 'object',
          required: ['xMin', 'yMin', 'xMax', 'yMax'],
          properties: {
            xMin: {
              type: 'integer'
            },
            yMin: {
              type: 'integer'
            },
            xMax: {
              type: 'integer'
            },
            yMax: {
              type: 'integer'
            }
          }
        }
      }
    },
    additionalProperties: false
  }

  export const validate: ValidateFunction<World> = generateLazyValidator(schema)
}
