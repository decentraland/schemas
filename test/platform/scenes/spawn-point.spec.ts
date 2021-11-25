import expect from 'expect'
import { SpawnPoint } from '../../../src'
import { testTypeSignature } from '../../test-utils'

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

  testTypeSignature(SpawnPoint, spawnPoint)

  it('static tests must pass', () => {
    expect(SpawnPoint.validate(spawnPoint)).toEqual(true)
    expect(SpawnPoint.validate(null)).toEqual(false)
    expect(SpawnPoint.validate({})).toEqual(false)
  })

  it('position with empty array fails', () => {
    expect(
      SpawnPoint.validate({
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
      SpawnPoint.validate({
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
      SpawnPoint.validate({
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
