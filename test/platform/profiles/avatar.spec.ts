import expect from 'expect'
import { Avatar } from '../../../src'
import { testTypeSignature } from '../../test-utils'

const AVATAR_INFO = {
  bodyShape: 'urn:decentraland:off-chain:base-avatars:BaseMale',
  snapshots: {
    face: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q',
    face128: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5r',
    face256: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5s',
    body: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5t'
  },
  eyes: { color: { r: 0.23046875, g: 0.625, b: 0.3125 } },
  hair: { color: { r: 0.35546875, g: 0.19140625, b: 0.05859375 } },
  skin: { color: { r: 0.94921875, g: 0.76171875, b: 0.6484375 } },
  wearables: [
    'urn:decentraland:off-chain:base-avatars:tall_front_01',
    'urn:decentraland:off-chain:base-avatars:eyes_08',
    'urn:decentraland:off-chain:base-avatars:eyebrows_00',
    'urn:decentraland:off-chain:base-avatars:mouth_05',
    'urn:decentraland:matic:collections-v2:0xf6f601efee04e74cecac02c8c5bdc8cc0fc1c721:0',
    'urn:decentraland:off-chain:base-avatars:classic_shoes',
    'urn:decentraland:off-chain:base-avatars:red_tshirt',
    'urn:decentraland:off-chain:base-avatars:trash_jean'
  ]
}

export const AVATAR: Avatar = {
  userId: '0x87956abc4078a0cc3b89b419628b857b8af826ed',
  email: 'some@email.com',
  name: 'Some Name',
  hasClaimedName: true,
  description: 'Some Description',
  ethAddress: '0x87956abC4078a0Cc3b89b419628b857B8AF826Ed',
  version: 44,
  avatar: AVATAR_INFO,
  tutorialStep: 355,
  interests: []
}

describe('Avatar tests', () => {
  testTypeSignature(Avatar, AVATAR)

  it('static tests must pass', () => {
    expect(Avatar.validate(AVATAR)).toEqual(true)
    expect(Avatar.validate(null)).toEqual(false)
    expect(Avatar.validate({})).toEqual(false)
  })

  it('given an invalid ETH address when validating Avatar then result is false', () => {
    const avatar: Avatar = { ...AVATAR, ethAddress: 'someInvalidAddress' }
    expect(Avatar.validate(avatar)).toEqual(false)
  })
})
