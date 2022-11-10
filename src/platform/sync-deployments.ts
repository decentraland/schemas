import { AuthChain } from '../misc/auth-chain'
import {
  generateLazyValidator,
  JSONSchema,
  ValidateFunction
} from '../validation'

type SyncDeployment = {
  entityId: string
  entityType: string
  pointers: string[]
  authChain: AuthChain
}

/**
 * This type describes deployment + AuthChain needed to synchronize
 * a deployed entity across catalysts from the snapshots.
 * @public
 */
export type SnapshotSyncDeployment = SyncDeployment & {
  entityTimestamp: number
}

/**
 * @public
 */
export namespace SnapshotSyncDeployment {
  export const schema: JSONSchema<SnapshotSyncDeployment> = {
    type: 'object',
    properties: {
      entityId: { type: 'string' },
      entityType: { type: 'string' },
      pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
      entityTimestamp: { type: 'number', minimum: 0 },
      authChain: AuthChain.schema
    },
    required: [
      'entityId',
      'entityType',
      'pointers',
      'entityTimestamp',
      'authChain'
    ]
  }

  export const validate: ValidateFunction<SnapshotSyncDeployment> =
    generateLazyValidator(schema)
}

/**
 * This type describes deployment + AuthChain needed to synchronize
 * a deployed entity across catalysts from the old snapshots and /pointer-changes endpoint.
 * @public
 */
export type PointerChangesSyncDeployment = SyncDeployment & {
  localTimestamp: number
}

/**
 * @public
 */
export namespace PointerChangesSyncDeployment {
  export const schema: JSONSchema<PointerChangesSyncDeployment> = {
    type: 'object',
    properties: {
      entityId: { type: 'string' },
      entityType: { type: 'string' },
      pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
      localTimestamp: { type: 'number', minimum: 0 },
      authChain: AuthChain.schema
    },
    required: [
      'entityId',
      'entityType',
      'pointers',
      'localTimestamp',
      'authChain'
    ]
  }

  export const validate: ValidateFunction<PointerChangesSyncDeployment> =
    generateLazyValidator(schema)
}
