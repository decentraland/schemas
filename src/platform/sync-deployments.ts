import { IPFSv1, IPFSv2 } from '../misc'
import { AuthChain } from '../misc/auth-chain'
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

export type SyncDeployment = SnapshotSyncDeployment | PointerChangesSyncDeployment

/**
 * This type describes deployment + AuthChain needed to synchronize
 * a deployed entity across catalysts from the snapshots.
 * @public
 */
export type SnapshotSyncDeployment = {
  entityId: IPFSv1 | IPFSv2
  entityType: string
  pointers: string[]
  authChain: AuthChain
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
      authChain: AuthChain.schema,
      entityTimestamp: { type: 'number', minimum: 0 }
    },
    oneOf: [{ properties: { entityId: IPFSv1.schema } }, { properties: { entityId: IPFSv2.schema } }],
    required: ['entityId', 'entityType', 'pointers', 'entityTimestamp', 'authChain']
  }

  export const validate: ValidateFunction<SnapshotSyncDeployment> = generateLazyValidator(schema)
}

/**
 * This type describes deployment + AuthChain needed to synchronize
 * a deployed entity across catalysts from the old snapshots and /pointer-changes endpoint.
 * @public
 */
export type PointerChangesSyncDeployment = SnapshotSyncDeployment & {
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
      authChain: AuthChain.schema,
      entityTimestamp: { type: 'number', minimum: 0 },
      localTimestamp: { type: 'number', minimum: 0 }
    },
    oneOf: [{ properties: { entityId: IPFSv1.schema } }, { properties: { entityId: IPFSv2.schema } }],
    required: ['entityId', 'entityType', 'pointers', 'localTimestamp', 'entityTimestamp', 'authChain']
  }

  export const validate: ValidateFunction<PointerChangesSyncDeployment> = generateLazyValidator(schema)
}
