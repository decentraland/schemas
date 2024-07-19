import { Entity } from '../entity'
import { BaseEvent, Events } from './base'

export type CatalystDeploymentEvent = BaseEvent & {
  type: Events.Type.CATALYST_DEPLOYMENT
  subType: Events.SubType.CatalystDeployment
  entity: Entity
}
