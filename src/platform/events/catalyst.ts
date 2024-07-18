import { Entity, EntityType } from '../entity'
import { BaseEvent, EventType } from './base'

export type CatalystDeploymentEvent = BaseEvent & {
  type: EventType.CATALYST_DEPLOYMENT
  subType: EntityType
  entity: Entity
}
