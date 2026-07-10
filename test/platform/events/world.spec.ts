import expect from 'expect'
import {
  AuthChain,
  AuthLinkType,
  Events,
  WorldDeploymentEvent,
  WorldSpawnCoordinateSetEvent,
  WorldScenesUndeploymentEvent,
  WorldUndeploymentEvent
} from '../../../src'

const chain: AuthChain = [
  {
    type: AuthLinkType.SIGNER,
    payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
    signature: ''
  },
  {
    type: AuthLinkType.ECDSA_EIP_1654_EPHEMERAL,
    payload:
      'Decentraland Login\nEphemeral address: 0x69fBdE5Da06eb76e8E7F6Fd2FEEd968F28b951a5\nExpiration: Tue Aug 06 7112 10:14:51 GMT-0300 (Argentina Standard Time)',
    signature:
      '0x03524dbe44d19aacc8162b4d5d17820c370872de7bfd25d1add2b842adb1de546b454fc973b6d215883c30f4c21774ae71683869317d773f27e6bfaa9a2a05101b36946c3444914bb93f17a29d88e2449bcafdb6478b4835102c522197fa6f63d13ce5ab1d5c11c95db0c210fb4380995dff672392e5569c86d7c6bb2a44c53a151c'
  },
  {
    type: AuthLinkType.ECDSA_PERSONAL_SIGNED_ENTITY,
    payload: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
    signature:
      '0xd73b0315dd39080d9b6d1a613a56732a75d68d2cef2a38f3b7be12bdab3c59830c92c6bdf394dcb47ba1aa736e0338cf9112c9eee59dbe4109b8af6a993b12d71b'
  }
]

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
            { entityId: 'entity-1', baseParcel: '0,0' },
            { entityId: 'entity-2', baseParcel: '-1,2' }
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

describe('when validating the WorldDeploymentEvent', () => {
  describe('and the event is valid', () => {
    let event: WorldDeploymentEvent

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.DEPLOYMENT,
        key: 'my-world.dcl.eth',
        timestamp: 1,
        entity: {
          entityId: 'bafkreieu7mh6tinryekouyg75bhruggrn3a6k4oqknvrw6scsfymqihbcy',
          pointers: ['0,0', '0,1'],
          authChain: chain
        },
        worldName: 'my-world.dcl.eth',
        contentServerUrls: ['https://worlds-content-server.decentraland.org']
      }
    })

    it('should return true', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(true)
    })
  })

  describe('and the worldName is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.DEPLOYMENT,
        key: 'key',
        timestamp: 1,
        entity: {
          entityId: 'bafkreieu7mh6tinryekouyg75bhruggrn3a6k4oqknvrw6scsfymqihbcy',
          pointers: ['0,0'],
          authChain: chain
        }
      }
    })

    it('should return false', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the entity pointers are missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.DEPLOYMENT,
        key: 'key',
        timestamp: 1,
        entity: {
          entityId: 'bafkreieu7mh6tinryekouyg75bhruggrn3a6k4oqknvrw6scsfymqihbcy',
          authChain: chain
        },
        worldName: 'my-world.dcl.eth'
      }
    })

    it('should return false', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the entity pointers array is empty', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.DEPLOYMENT,
        key: 'key',
        timestamp: 1,
        entity: {
          entityId: 'bafkreieu7mh6tinryekouyg75bhruggrn3a6k4oqknvrw6scsfymqihbcy',
          pointers: [],
          authChain: chain
        },
        worldName: 'my-world.dcl.eth'
      }
    })

    it('should return false', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(false)
    })
  })

  describe('and the entity is missing', () => {
    let event: any

    beforeEach(() => {
      event = {
        type: Events.Type.WORLD,
        subType: Events.SubType.Worlds.DEPLOYMENT,
        key: 'key',
        timestamp: 1,
        worldName: 'my-world.dcl.eth'
      }
    })

    it('should return false', () => {
      expect(WorldDeploymentEvent.validate(event)).toEqual(false)
    })
  })
})
