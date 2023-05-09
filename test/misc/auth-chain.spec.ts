import expect from 'expect'
import { AuthChain, AuthLinkType } from '../../src'
import { expectValidationFailureWithErrors } from '../test-utils'
describe('auth-chain', () => {
  it('valid with empty string signature for SIGNER', () => {
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
    expect(AuthChain.validate(chain)).toEqual(true)
  })

  it('valid with no signature for SIGNER', () => {
    const chain: AuthChain = [
      {
        type: AuthLinkType.SIGNER,
        payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
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
    expect(AuthChain.validate(chain)).toEqual(true)
  })
  it('invalid', () => {
    expect(AuthChain.validate([])).toEqual(false)
  })

  it('invalid - signature must be present if type is different from SIGNER', () => {
    const chain: AuthChain = [
      {
        type: AuthLinkType.SIGNER,
        payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5'
      },
      {
        type: AuthLinkType.ECDSA_EIP_1654_EPHEMERAL,
        payload:
          'Decentraland Login\nEphemeral address: 0x69fBdE5Da06eb76e8E7F6Fd2FEEd968F28b951a5\nExpiration: Tue Aug 06 7112 10:14:51 GMT-0300 (Argentina Standard Time)'
      },
      {
        type: AuthLinkType.ECDSA_PERSONAL_SIGNED_ENTITY,
        payload: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo',
        signature:
          '0xd73b0315dd39080d9b6d1a613a56732a75d68d2cef2a38f3b7be12bdab3c59830c92c6bdf394dcb47ba1aa736e0338cf9112c9eee59dbe4109b8af6a993b12d71b'
      }
    ]
    expectValidationFailureWithErrors(AuthChain.validate, chain, ["must have required property 'signature'"])
  })

  it(`invalid - if signature present in SIGNER, it must be ''`, () => {
    const chain: AuthChain = [
      {
        type: AuthLinkType.SIGNER,
        payload: '0x3b21028719a4aca7ebee35b0157a6f1b0cf0d0c5',
        signature: 'asdf'
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
    expectValidationFailureWithErrors(AuthChain.validate, chain, ['must be equal to constant'])
  })
})
