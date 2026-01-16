import expect from 'expect'
import { WorldSpawnCoordinateSetEvent, Events } from '../../../src'

describe('when validating the WorldSpawnCoordinateSetEvent', () => {
  describe('and the event is valid', () => {
    describe('and the name uses .dcl.eth suffix', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: Events.Type.WORLD,
          subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
          key: 'key',
          timestamp: 1,
          metadata: {
            name: 'my-world.dcl.eth',
            oldCoordinate: { x: 5, y: 10 },
            newCoordinate: { x: 10, y: 20 }
          }
        }
      })

      it('should return true', () => {
        expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(true)
      })
    })

    describe('and the name uses .eth suffix', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: Events.Type.WORLD,
          subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
          key: 'key',
          timestamp: 1,
          metadata: {
            name: 'my-world.eth',
            oldCoordinate: { x: 0, y: 0 },
            newCoordinate: { x: 0, y: 0 }
          }
        }
      })

      it('should return true', () => {
        expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(true)
      })
    })

    describe('and the coordinates are negative', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: Events.Type.WORLD,
          subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
          key: 'key',
          timestamp: 1,
          metadata: {
            name: 'test_world.dcl.eth',
            oldCoordinate: { x: -5, y: -10 },
            newCoordinate: { x: -15, y: -20 }
          }
        }
      })

      it('should return true', () => {
        expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(true)
      })
    })

    describe('and the oldCoordinate is null', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: Events.Type.WORLD,
          subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
          key: 'key',
          timestamp: 1,
          metadata: {
            name: 'my-world.dcl.eth',
            oldCoordinate: null,
            newCoordinate: { x: 10, y: 20 }
          }
        }
      })

      it('should return true', () => {
        expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(true)
      })
    })
  })

  describe('and the event is null', () => {
    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(null)).toEqual(false)
    })
  })

  describe('and the event is an empty object', () => {
    let event: any

    beforeEach(() => {
      event = {}
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the metadata is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the oldCoordinate is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the name is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate x is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate y is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the name has an invalid pattern', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'invalid-name',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the metadata has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 },
          extraField: 'not-allowed'
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20, z: 30 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the oldCoordinate has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10, z: 15 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the timestamp is negative', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: -1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the type is invalid', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: 'invalid-type',
        subType: Events.SubType.Worlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the subType is invalid', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: 'invalid-subtype',
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(WorldSpawnCoordinateSetEvent.validate(event)).toEqual(false)
    })
  })
})
