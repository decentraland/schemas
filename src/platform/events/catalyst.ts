import { Entity } from '../entity'
import { BaseEvent, EventType } from './base'

export type CatalystDeployment = BaseEvent & {
  type: EventType.CATALYST_DEPLOYMENT
  entity: Entity
}
