import expect from 'expect'
import { Entity } from '../../src'

describe('Entity', () => {
  it('sanity', () => {
    expect(
      Entity.validate({
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
      Entity.validate({
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
      Entity.validate({
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
