import { expect } from 'expect'
import type { SpawnPoint } from '../../../src'
import { spawnPointSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateSpawnPoint = generateLazyValidator(spawnPointSchema)

describe('Spawn point tests', () => {
  const spawnPoint: SpawnPoint = {
    name: 'spawn1',
    default: true,
    position: {
      x: [1, 5],
      y: [1, 1],
      z: [2, 4]
    },
    cameraTarget: {
      x: 10,
      y: 1,
      z: 4
    }
  }

  testTypeSignature({ schema: spawnPointSchema }, spawnPoint)

  it('static tests must pass', () => {
    expect(validateSpawnPoint(spawnPoint)).toEqual(true)
    expect(validateSpawnPoint(null)).toEqual(false)
    expect(validateSpawnPoint({})).toEqual(false)
  })

  it('position with empty array fails', () => {
    expect(
      validateSpawnPoint({
        ...spawnPoint,
        position: {
          ...spawnPoint.position,
          x: []
        }
      })
    ).toEqual(false)
  })

  it('position with combination of array and number fails', () => {
    expect(
      validateSpawnPoint({
        ...spawnPoint,
        position: {
          ...spawnPoint.position,
          x: 1
        }
      })
    ).toEqual(false)
  })

  it('position with string only numbers works', () => {
    expect(
      validateSpawnPoint({
        ...spawnPoint,
        position: {
          x: 1,
          y: 1,
          z: 2
        }
      })
    ).toEqual(true)
  })
})
