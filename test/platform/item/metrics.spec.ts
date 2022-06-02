import expect from 'expect'
import { Metrics } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Metrics tests', () => {
  const metrics: Metrics = {
    triangles: 10,
    materials: 20,
    textures: 30,
    meshes: 40,
    bodies: 50,
    entities: 60
  }

  testTypeSignature(Metrics, metrics)

  it('static tests must pass', () => {
    expect(Metrics.validate(metrics)).toEqual(true)
    expect(Metrics.validate(null)).toEqual(false)
    expect(Metrics.validate({})).toEqual(false)
  })
})
