import { IPFSv1, IPFSv2, ipfsv1Schema, ipfsv2Schema } from '../misc/index.js'
import { AuthChain, authChainSchema } from '../misc/auth-chain.js'
import type { JSONSchema } from '../validation/types.js'

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
export const snapshotSyncDeploymentSchema: JSONSchema<SnapshotSyncDeployment> = {
  type: 'object',
  properties: {
    entityId: { type: 'string' },
    entityType: { type: 'string' },
    pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
    authChain: authChainSchema,
    entityTimestamp: { type: 'number', minimum: 0 }
  },
  oneOf: [{ properties: { entityId: ipfsv1Schema } }, { properties: { entityId: ipfsv2Schema } }],
  required: ['entityId', 'entityType', 'pointers', 'entityTimestamp', 'authChain']
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
export const pointerChangesSyncDeploymentSchema: JSONSchema<PointerChangesSyncDeployment> = {
  type: 'object',
  properties: {
    entityId: { type: 'string' },
    entityType: { type: 'string' },
    pointers: { type: 'array', items: { type: 'string' }, minItems: 1 },
    authChain: authChainSchema,
    entityTimestamp: { type: 'number', minimum: 0 },
    localTimestamp: { type: 'number', minimum: 0 }
  },
  oneOf: [{ properties: { entityId: ipfsv1Schema } }, { properties: { entityId: ipfsv2Schema } }],
  required: ['entityId', 'entityType', 'pointers', 'localTimestamp', 'entityTimestamp', 'authChain']
}
