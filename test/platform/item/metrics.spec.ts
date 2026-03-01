import { expect } from 'expect'
import type { Metrics } from '../../../src'
import { metricsSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateMetrics = generateLazyValidator(metricsSchema)

describe('Metrics tests', () => {
  const metrics: Metrics = {
    triangles: 10,
    materials: 20,
    textures: 30,
    meshes: 40,
    bodies: 50,
    entities: 60
  }

  testTypeSignature({ schema: metricsSchema }, metrics)

  it('static tests must pass', () => {
    expect(validateMetrics(metrics)).toEqual(true)
    expect(validateMetrics(null)).toEqual(false)
    expect(validateMetrics({})).toEqual(false)
  })
})
