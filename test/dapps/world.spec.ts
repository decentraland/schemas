import { expect } from 'expect'
import { type World, worldSchema } from '../../src'
import { getWorld, isInsideWorldLimits } from '../../src/dapps/world'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateWorld = generateLazyValidator(worldSchema)

describe('World tests', () => {
  const world: World = getWorld()

  testTypeSignature({ schema: worldSchema }, world)

  it('static tests must pass', () => {
    expect(validateWorld(world)).toEqual(true)
    expect(validateWorld(null)).toEqual(false)
    expect(validateWorld({})).toEqual(false)
    expect(isInsideWorldLimits(63, 80)).toEqual(true)
  })
})
