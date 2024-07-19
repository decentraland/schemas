import expect from 'expect'
import { CatalystDeploymentEvent, Entity, Events } from '../../../src'

describe('Catalyst Events tests', () => {
  it('CatalystDeploymentEvent static tests must pass', () => {
    const event: CatalystDeploymentEvent = {
      type: Events.Type.CATALYST_DEPLOYMENT,
      subType: Events.SubType.CatalystDeployment.SCENE,
      key: 'key',
      timestamp: 1,
      entity: {
        content: [],
        id: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        pointers: ['asd'],
        timestamp: 1,
        type: 'scene',
        metadata: {},
        version: 'v3'
      } as Entity
    }

    expect(CatalystDeploymentEvent.validate(event)).toEqual(true)
    expect(CatalystDeploymentEvent.validate(null)).toEqual(false)
    expect(CatalystDeploymentEvent.validate({})).toEqual(false)
  })
})
