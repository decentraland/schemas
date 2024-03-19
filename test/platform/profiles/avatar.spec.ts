import expect from 'expect'
import { Avatar } from '../../../src'
import { testTypeSignature } from '../../test-utils'

const AVATAR_INFO = {
  bodyShape: 'urn:decentraland:off-chain:base-avatars:BaseMale',
  snapshots: {
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
  links: [
    {
      title: 'Twitter',
      url: 'https://twitter.com/decentraland'
    },
    {
      title: 'Discord',
      url: 'https://discord.gg/decentraland'
    },
    {
      title: 'Handle',
      url: 'https://twitter.com/@decentraland'
    }
  ],
  ethAddress: '0x87956abC4078a0Cc3b89b419628b857B8AF826Ed',
  version: 44,
  avatar: AVATAR_INFO,
  tutorialStep: 355,
  interests: [],
  hasConnectedWeb3: true
}

export const AVATAR_WITH_EMOTES: Avatar = {
  userId: '0x87956abc4078a0cc3b89b419628b857b8af826ed',
  email: 'some@email.com',
  name: 'Some Name',
  hasClaimedName: true,
  description: 'Some Description',
  country: 'Argetina',
  relationshipStatus: 'situationship',
  profession: 'Ninja Software Engineer',
  birthdate: 1687537233,
  realName: 'Tini',
  hobbies: 'sing, dance, code, play, eat, sleep, repeat',
  ethAddress: '0x87956abC4078a0Cc3b89b419628b857B8AF826Ed',
  version: 44,
  avatar: {
    ...AVATAR_INFO,
    emotes: [{ slot: 1, urn: 'my-urn' }]
  },
  tutorialStep: 355,
  interests: [],
  hasConnectedWeb3: true
}

describe('Avatar tests', () => {
  testTypeSignature(Avatar, AVATAR)
  testTypeSignature(Avatar, AVATAR_WITH_EMOTES)

  it('static tests must pass', () => {
    expect(Avatar.validate(AVATAR)).toEqual(true)
    expect(Avatar.validate(AVATAR_WITH_EMOTES)).toEqual(true)
    expect(Avatar.validate(null)).toEqual(false)
    expect(Avatar.validate({})).toEqual(false)
  })

  it('given an invalid ETH address when validating Avatar then result is false', () => {
    const avatar: Avatar = { ...AVATAR, ethAddress: 'someInvalidAddress' }
    expect(Avatar.validate(avatar)).toEqual(false)
  })

  describe('when the avatar contains links that have query parameters', () => {
    it('should return false', () => {
      const avatar: Avatar = {
        ...AVATAR,
        links: [{ title: 'Invalid Link', url: 'https://alink.com?aVar=aValue&anotherVar=anotherValue' }]
      }
      expect(Avatar.validate(avatar)).toEqual(true)
    })
  })

  describe('when the avatar contains links with url encoded characters', () => {
    it('should return true', () => {
      const avatar: Avatar = {
        ...AVATAR,
        links: [{ title: 'Link', url: 'https://alink.com?someVar=some%20value' }]
      }
      expect(Avatar.validate(avatar)).toEqual(true)
    })
  })

  describe('when the avatar contains links that are of the https protocol', () => {
    it('should return true', () => {
      const avatar: Avatar = {
        ...AVATAR,
        links: [{ title: 'Link', url: 'https://alink.com' }]
      }
      expect(Avatar.validate(avatar)).toEqual(true)
    })
  })

  describe('when the avatar contains links that are of the http protocol', () => {
    it('should return true', () => {
      const avatar: Avatar = {
        ...AVATAR,
        links: [{ title: 'Link', url: 'http://alink.com' }]
      }
      expect(Avatar.validate(avatar)).toEqual(true)
    })
  })

  describe("when the avatar contains links that point to a protocol that's not http", () => {
    it('should return false', () => {
      const avatar: Avatar = {
        ...AVATAR,
        links: [{ title: 'Invalid Link', url: 'javascript:window%5b%22ale%22%2b%22rt%22%5d(document.domain)//.com' }]
      }
      expect(Avatar.validate(avatar)).toEqual(false)
    })
  })
})
