import expect from 'expect'
import {
  WorldSpawnCoordinateSetEvent,
  WorldScenesUndeploymentEvent,
  WorldUndeploymentEvent,
  WorldDeploymentEvent,
  WorldSettingsChangedEvent,
  AuthLinkType,
  Events,
  ValidateFunction
} from '../../../src'
import { compileExportedSchema } from '../../test-utils'

const ENTITY_ID = 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'
const ANOTHER_ENTITY_ID = 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5r'

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

describe('when validating the WorldScenesUndeploymentEvent', () => {
  describe('and the event is valid', () => {
    let event: WorldScenesUndeploymentEvent

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [
            { entityId: ENTITY_ID, baseParcel: '0,0' },
            { entityId: ANOTHER_ENTITY_ID, baseParcel: '-1,2' }
          ]
        }
      }
    })

    it('should return true', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the event is null', () => {
    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(null)).toEqual(false)
    })
  })

  describe('and the event contains more than one thousand unique scenes', () => {
    let event: WorldScenesUndeploymentEvent

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: Array.from({ length: 1001 }, (_, index) => ({
            entityId: `ba${index.toString().padStart(57, 'a')}`,
            baseParcel: `${index},0`
          }))
        }
      }
    })

    it('should not impose an event scene count limit', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and two entries reuse the same entity identity', () => {
    let event: WorldScenesUndeploymentEvent
    let directSchemaValidator: ValidateFunction<WorldScenesUndeploymentEvent>

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [
            { entityId: ENTITY_ID, baseParcel: '0,0' },
            { entityId: ENTITY_ID, baseParcel: '1,0' }
          ]
        }
      }
      directSchemaValidator = compileExportedSchema(WorldScenesUndeploymentEvent.schema)
    })

    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })

    it('should be rejected when compiling the exported schema directly', () => {
      expect(directSchemaValidator(event)).toEqual(false)
    })

    it('should expose the AJV unique-property error', () => {
      WorldScenesUndeploymentEvent.validate(event)

      expect(WorldScenesUndeploymentEvent.validate.errors?.map((error) => error.keyword)).toContain(
        'uniqueItemProperties'
      )
    })
  })

  describe('and two entries reuse the same base parcel', () => {
    let event: WorldScenesUndeploymentEvent
    let directSchemaValidator: ValidateFunction<WorldScenesUndeploymentEvent>

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [
            { entityId: ENTITY_ID, baseParcel: '0,0' },
            { entityId: ANOTHER_ENTITY_ID, baseParcel: '0,0' }
          ]
        }
      }
      directSchemaValidator = compileExportedSchema(WorldScenesUndeploymentEvent.schema)
    })

    it('should be rejected by the authoritative validator', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })

    it('should be rejected when compiling the exported schema directly', () => {
      expect(directSchemaValidator(event)).toEqual(false)
    })

    it('should expose the AJV unique-property error', () => {
      WorldScenesUndeploymentEvent.validate(event)

      expect(WorldScenesUndeploymentEvent.validate.errors?.map((error) => error.keyword)).toContain(
        'uniqueItemProperties'
      )
    })
  })

  describe('and a base parcel is not canonical', () => {
    let event: WorldScenesUndeploymentEvent

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [{ entityId: ENTITY_ID, baseParcel: '00,0' }]
        }
      }
    })

    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the metadata is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1
      }
    })

    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the worldName is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          scenes: [{ entityId: 'entity-1', baseParcel: '0,0' }]
        }
      }
    })

    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the scenes array is empty', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: []
        }
      }
    })

    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and a scene is missing baseParcel', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          scenes: [{ entityId: 'entity-1' }]
        }
      }
    })

    it('should return false', () => {
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the metadata has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_SCENES_UNDEPLOYMENT,
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
      expect(WorldScenesUndeploymentEvent.validate(event)).toEqual(false)
    })
  })
})

describe('when validating the WorldDeploymentEvent', () => {
  let event: WorldDeploymentEvent

  beforeEach(() => {
    event = {
      type: Events.Type.WORLD,
      subType: Events.SubType.Worlds.DEPLOYMENT,
      key: '',
      timestamp: 1,
      entity: {
        entityId: 'entity-id',
        authChain: [{ type: AuthLinkType.SIGNER, payload: '0x0000000000000000000000000000000000000000' }]
      },
      contentServerUrls: ['https://worlds-content-server.decentraland.org']
    }
  })

  describe('and the event uses its existing public contract', () => {
    it('should return true', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the content server entry is not a URL', () => {
    beforeEach(() => {
      event.contentServerUrls = ['not-a-url']
    })

    it('should preserve compatibility with existing string values', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the content server list is empty', () => {
    beforeEach(() => {
      event.contentServerUrls = []
    })

    it('should preserve compatibility with existing empty lists', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the content server list has repeated values beyond the removed limit', () => {
    beforeEach(() => {
      event.contentServerUrls = Array.from({ length: 11 }, () => 'content-server')
    })

    it('should preserve compatibility with the existing unrestricted list', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the entity contains undeclared properties', () => {
    beforeEach(() => {
      ;(event.entity as any).unexpected = true
    })

    it('should preserve entity extension fields', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and animation and LOD values use their existing unrestricted string shape', () => {
    beforeEach(() => {
      event.animation = 'a'.repeat(2049)
      event.lods = Array.from({ length: 101 }, (_, index) => `lod-${index}`)
    })

    it('should preserve compatibility with existing event consumers', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })
})

describe('when validating the WorldSettingsChangedEvent', () => {
  let event: WorldSettingsChangedEvent

  beforeEach(() => {
    event = {
      type: Events.Type.WORLD,
      subType: Events.SubType.Worlds.WORLD_SETTINGS_CHANGED,
      key: 'my-world.dcl.eth',
      timestamp: 1,
      metadata: {
        worldName: 'world',
        title: 't'.repeat(201),
        description: 'd'.repeat(5001),
        contentRating: 'r'.repeat(65),
        categories: Array.from({ length: 51 }, () => 'category'.repeat(10)),
        thumbnailUrl: 'not-a-url',
        accessType: 'a'.repeat(65)
      }
    }
  })

  it('should not introduce settings limits without a domain contract', () => {
    expect(WorldSettingsChangedEvent.validate(event)).toEqual(true)
  })
})

describe('when validating the WorldUndeploymentEvent', () => {
  describe('and the event is valid', () => {
    let event: WorldUndeploymentEvent

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_UNDEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth'
        }
      }
    })

    it('should return true', () => {
      expect(WorldUndeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the event is null', () => {
    it('should return false', () => {
      expect(WorldUndeploymentEvent.validate(null)).toEqual(false)
    })
  })

  describe('and the metadata is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1
      }
    })

    it('should return false', () => {
      expect(WorldUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the worldName is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {}
      }
    })

    it('should return false', () => {
      expect(WorldUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the metadata has additional properties', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: 1,
        metadata: {
          worldName: 'my-world.dcl.eth',
          extraField: 'not-allowed'
        }
      }
    })

    it('should return false', () => {
      expect(WorldUndeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the timestamp is negative', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.WORLD_UNDEPLOYMENT,
        key: 'key',
        timestamp: -1,
        metadata: {
          worldName: 'my-world.dcl.eth'
        }
      }
    })

    it('should return false', () => {
      expect(WorldUndeploymentEvent.validate(event)).toEqual(false)
    })
  })
})
