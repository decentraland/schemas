import { expect } from 'expect'
import {
  WorldSpawnCoordinateSetEvent,
  WorldScenesUndeploymentEvent,
  WorldUndeploymentEvent,
  EventType,
  EventSubTypeWorlds,
  worldScenesUndeploymentEventSchema,
  worldSpawnCoordinateSetEventSchema,
  worldUndeploymentEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateWorldScenesUndeploymentEvent = generateLazyValidator(worldScenesUndeploymentEventSchema)
const validateWorldSpawnCoordinateSetEvent = generateLazyValidator(worldSpawnCoordinateSetEventSchema)
const validateWorldUndeploymentEvent = generateLazyValidator(worldUndeploymentEventSchema)

describe('when validating the WorldSpawnCoordinateSetEvent', () => {
  describe('and the event is valid', () => {
    describe('and the name uses .dcl.eth suffix', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: EventType.WORLD,
          subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
        expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(true)
      })
    })

    describe('and the name uses .eth suffix', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: EventType.WORLD,
          subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
        expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(true)
      })
    })

    describe('and the coordinates are negative', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: EventType.WORLD,
          subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
        expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(true)
      })
    })

    describe('and the oldCoordinate is null', () => {
      let event: WorldSpawnCoordinateSetEvent

      beforeEach(() => {
        event = {
          type: EventType.WORLD,
          subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
        expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(true)
      })
    })
  })

  describe('and the event is null', () => {
    it('should return false', () => {
      expect(validateWorldSpawnCoordinateSetEvent(null)).toEqual(false)
    })
  })

  describe('and the event is an empty object', () => {
    let event: any

    beforeEach(() => {
      event = {}
    })

    it('should return false', () => {
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the metadata is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1
      }
    })

    it('should return false', () => {
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          oldCoordinate: { x: 5, y: 10 }
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the oldCoordinate is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          name: 'my-world.dcl.eth',
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the name is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
        key: 'key',
        timestamp: 1,
        metadata: {
          oldCoordinate: { x: 5, y: 10 },
          newCoordinate: { x: 10, y: 20 }
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate x is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate y is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the name has an invalid pattern', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the metadata has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the newCoordinate has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the oldCoordinate has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the timestamp is negative', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the type is invalid', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: 'invalid-type',
        subType: EventSubTypeWorlds.WORLD_SPAWN_COORDINATE_SET,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })

  describe('and the subType is invalid', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
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
      expect(validateWorldSpawnCoordinateSetEvent(event)).toEqual(false)
    })
  })
})

describe('when validating the WorldScenesUndeploymentEvent', () => {
  describe('and the event is valid', () => {
    let event: WorldScenesUndeploymentEvent

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [
            { entityId: 'entity-1', baseParcel: '0,0' },
            { entityId: 'entity-2', baseParcel: '-1,2' }
          ]
        }
      }
    })

    it('should return true', () => {
      expect(validateWorldScenesUndeploymentEvent(event)).toEqual(true)
    })
  })

  describe('and the event is null', () => {
    it('should return false', () => {
      expect(validateWorldScenesUndeploymentEvent(null)).toEqual(false)
    })
  })

  describe('and the metadata is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1
      }
    })

    it('should return false', () => {
      expect(validateWorldScenesUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and the worldName is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          scenes: [{ entityId: 'entity-1', baseParcel: '0,0' }]
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldScenesUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and the scenes array is empty', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: []
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldScenesUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and a scene is missing baseParcel', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [{ entityId: 'entity-1' }]
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldScenesUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and the metadata has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [{ entityId: 'entity-1', baseParcel: '0,0' }],
          extraField: 'not-allowed'
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldScenesUndeploymentEvent(event)).toEqual(false)
    })
  })
})

describe('when validating the WorldUndeploymentEvent', () => {
  describe('and the event is valid', () => {
    let event: WorldUndeploymentEvent

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth'
        }
      }
    })

    it('should return true', () => {
      expect(validateWorldUndeploymentEvent(event)).toEqual(true)
    })
  })

  describe('and the event is null', () => {
    it('should return false', () => {
      expect(validateWorldUndeploymentEvent(null)).toEqual(false)
    })
  })

  describe('and the metadata is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1
      }
    })

    it('should return false', () => {
      expect(validateWorldUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and the worldName is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {}
      }
    })

    it('should return false', () => {
      expect(validateWorldUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and the metadata has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          extraField: 'not-allowed'
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldUndeploymentEvent(event)).toEqual(false)
    })
  })

  describe('and the timestamp is negative', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: EventType.WORLD,
        subType: EventSubTypeWorlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: -1,
        metadata: {
          worldName: 'my-world.dcl.eth'
        }
      }
    })

    it('should return false', () => {
      expect(validateWorldUndeploymentEvent(event)).toEqual(false)
    })
  })
})
