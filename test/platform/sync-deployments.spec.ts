import expect from 'expect'
import { AuthLinkType, SnapshotSyncDeployment, PointerChangesSyncDeployment } from '../../src'
describe('snapshot-sync-deployment', () => {
  it('valid', () => {
    const deployment: SnapshotSyncDeployment = {
      authChain: [
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
      ],
      entityId: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
      entityType: 'scene',
      entityTimestamp: 123,
      pointers: ['asd']
    }
    expect(SnapshotSyncDeployment.validate(deployment)).toEqual(true)
    expect(
      SnapshotSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'bafybeiasb6yrmaounyilfuxbd5pltvosl3asdrfahsb2esg46q6tutyuya',
        entityType: 'scene',
        entityTimestamp: 1,
        pointers: ['asd']
      } as SnapshotSyncDeployment)
    ).toEqual(true)
  })
  it('invalid', () => {
    expect(
      SnapshotSyncDeployment.validate({
        authChain: [],
        entityId: 'asd',
        entityType: 'scene',
        entityTimestamp: 1,
        pointers: ['asd']
      } as SnapshotSyncDeployment)
    ).toEqual(false)
    expect(
      SnapshotSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'asd',
        entityType: 'scene',
        entityTimestamp: 1,
        pointers: []
      } as SnapshotSyncDeployment)
    ).toEqual(false)
    expect(
      SnapshotSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'asd',
        entityType: 'scene',
        entityTimestamp: -1,
        pointers: ['asd']
      } as SnapshotSyncDeployment)
    ).toEqual(false)
    expect(
      SnapshotSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'bainvalidhash',
        entityType: 'scene',
        entityTimestamp: 1,
        pointers: ['asd']
      } as SnapshotSyncDeployment)
    ).toEqual(false)
  })
})

describe('pointer-changes-sync-deployment', () => {
  it('valid', () => {
    const deployment: PointerChangesSyncDeployment = {
      authChain: [
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
      ],
      entityId: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
      entityType: 'scene',
      entityTimestamp: 122,
      localTimestamp: 123,
      pointers: ['asd']
    }
    expect(PointerChangesSyncDeployment.validate(deployment)).toEqual(true)
    expect(
      PointerChangesSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'bafybeiasb6yrmaounyilfuxbd5pltvosl3asdrfahsb2esg46q6tutyuya',
        entityType: 'scene',
        entityTimestamp: 0,
        localTimestamp: 1,
        pointers: ['asd']
      } as PointerChangesSyncDeployment)
    ).toEqual(true)
  })
  it('invalid', () => {
    expect(
      PointerChangesSyncDeployment.validate({
        authChain: [],
        entityId: 'asd',
        entityType: 'scene',
        entityTimestamp: 0,
        localTimestamp: 1,
        pointers: ['asd']
      } as PointerChangesSyncDeployment)
    ).toEqual(false)
    expect(
      PointerChangesSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'asd',
        entityType: 'scene',
        entityTimestamp: 0,
        localTimestamp: 1,
        pointers: []
      } as PointerChangesSyncDeployment)
    ).toEqual(false)
    expect(
      PointerChangesSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'asd',
        entityType: 'scene',
        entityTimestamp: 0,
        localTimestamp: -1,
        pointers: ['asd']
      } as PointerChangesSyncDeployment)
    ).toEqual(false)
    expect(
      PointerChangesSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'bainvalidhash',
        entityType: 'scene',
        entityTimestamp: 1,
        localTimestamp: 1,
        pointers: ['asd']
      } as PointerChangesSyncDeployment)
    ).toEqual(false)
    expect(
      PointerChangesSyncDeployment.validate({
        authChain: [
          {
            type: AuthLinkType.SIGNER,
            payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
            signature: ''
          }
        ],
        entityId: 'bafybeiasb6yrmaounyilfuxbd5pltvosl3asdrfahsb2esg46q6tutyuya',
        entityType: 'scene',
        localTimestamp: 1,
        pointers: ['asd']
      })
    ).toEqual(false)
  })
})
