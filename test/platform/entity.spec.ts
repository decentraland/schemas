import { expect } from 'expect'
import type { Entity } from '../../src'
import { entitySchema } from '../../src'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateEntity = generateLazyValidator(entitySchema)

describe('Entity', () => {
  it('sanity', () => {
    expect(
      validateEntity({
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      } as Entity)
    ).toEqual(true)
    expect(
      validateEntity({
        content: [],
        id: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      } as Entity)
    ).toEqual(true)
    expect(
      validateEntity({
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo-invalid',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      } as Entity)
    ).toEqual(false)
  })
})
