import expect from 'expect'
import { World } from '../../src'
import { getWorld, isInsideWorldLimits } from '../../src/dapps/world'
import { testTypeSignature } from '../test-utils'

describe('World tests', () => {
  const world: World = getWorld()

  testTypeSignature(World, world)

  it('static tests must pass', () => {
    expect(World.validate(world)).toEqual(true)
    expect(World.validate(null)).toEqual(false)
    expect(World.validate({})).toEqual(false)
    expect(isInsideWorldLimits(63, 80)).toEqual(true)
  })
})
