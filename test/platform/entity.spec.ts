import expect from 'expect'
import { Entity, EntityType } from '../../src'

describe('Entity', () => {
  it('sanity', () => {
    expect(
      Entity.validate({
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: EntityType.SCENE,
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
        type: EntityType.SCENE,
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
        type: EntityType.SCENE,
        metadata: {},
        version: 'v3'
      } as Entity)
    ).toEqual(false)
  })

  describe('when an entity has more than one thousand unique pointers', () => {
    let entity: Entity

    beforeEach(() => {
      entity = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: Array.from({ length: 1001 }, (_, index) => `pointer-${index}`),
        timestamp: 1,
        type: EntityType.SCENE,
        metadata: {},
        version: 'v3'
      }
    })

    it('should not impose a protocol-wide pointer count limit', () => {
      expect(Entity.validate(entity)).toEqual(true)
    })
  })

  describe('when an entity has a long non-empty pointer', () => {
    let entity: Entity

    beforeEach(() => {
      entity = {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['a'.repeat(2049)],
        timestamp: 1,
        type: EntityType.SCENE,
        metadata: {},
        version: 'v3'
      }
    })

    it('should leave pointer format limits to entity-specific validation', () => {
      expect(Entity.validate(entity)).toEqual(true)
    })
  })
})
