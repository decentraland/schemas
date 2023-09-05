import expect from 'expect'
import { BodyShape, ChainId, Network, NFT, NFTCategory, Rarity, WearableCategory, EmoteCategory } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('NFT tests', () => {
  describe('parcel', () => {
    const parcel: NFT = {
      id: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d-115792089237316195423570985008687907832172477916542379304728358347143500529549',
      tokenId: '115792089237316195423570985008687907832172477916542379304728358347143500529549',
      contractAddress: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
      activeOrderId: '0x2911f6ca62802491be38c859c6c3c8e3e3ae9732ad19032d4756a93f6fce88b1',
      openRentalId: null,
      owner: '0xdfbf2c0bfbfafbfa81a47b736012c80af181142b',
      name: 'The Dope Spot',
      image: 'https://api.decentraland.org/v1/parcels/-63/-115/map.png',
      url: '/contracts/0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d/tokens/115792089237316195423570985008687907832172477916542379304728358347143500529549',
      data: {
        parcel: {
          description: 'Get Your Smoke On',
          x: '-63',
          y: '-115',
          estate: null
        }
      },
      issuedId: null,
      itemId: null,
      category: NFTCategory.PARCEL,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_MAINNET,
      createdAt: 1545579159000,
      updatedAt: 1619273260000,
      soldAt: 1619273260000
    }

    testTypeSignature(NFT, parcel)

    it('static tests must pass', () => {
      expect(NFT.validate(parcel)).toEqual(true)
      expect(NFT.validate(null)).toEqual(false)
      expect(NFT.validate({})).toEqual(false)
    })
  })

  describe('estate', () => {
    const estate: NFT = {
      id: '0x959e104e1a4db6317fa58f8295f586e1a978c297-4302',
      tokenId: '4302',
      contractAddress: '0x959e104e1a4db6317fa58f8295f586e1a978c297',
      activeOrderId: '0xedd3ac22aca9f0aecf39d42479dc982170bc2fefea282fe77b4ce4b63859add8',
      openRentalId: 'e87f4f9a-19e1-4b6f-85bc-62921b503bfb',
      owner: '0x953c87eaee6889bf6623bf18031de42ba95a05cb',
      name: 'Fashion Hall',
      image: 'https://api.decentraland.org/v1/estates/4302/map.png',
      url: '/contracts/0x959e104e1a4db6317fa58f8295f586e1a978c297/tokens/4302',
      data: {
        estate: {
          description: null,
          size: 6,
          parcels: [
            {
              x: -140,
              y: -43
            },
            {
              x: -140,
              y: -42
            },
            {
              x: -139,
              y: -43
            },
            {
              x: -139,
              y: -42
            },
            {
              x: -138,
              y: -43
            },
            {
              x: -138,
              y: -42
            }
          ]
        }
      },
      issuedId: null,
      itemId: null,
      category: NFTCategory.ESTATE,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_MAINNET,
      createdAt: 1626182617000,
      updatedAt: 1626246391000,
      soldAt: 1626246391000
    }

    testTypeSignature(NFT, estate)

    it('static tests must pass', () => {
      expect(NFT.validate(estate)).toEqual(true)
      expect(NFT.validate(null)).toEqual(false)
      expect(NFT.validate({})).toEqual(false)
    })
  })

  describe('wearable', () => {
    const wearable: NFT = {
      id: '0xabb0ca6ee85825f6d7f549ef36bf571484c157c5-16',
      tokenId: '16',
      contractAddress: '0xabb0ca6ee85825f6d7f549ef36bf571484c157c5',
      activeOrderId: '0x606a55e3aaa112d90a9474d73d8293dc8496d491eff32431b762a7ca46160fc0',
      openRentalId: null,
      owner: '0x3bec652537ebf756d9c5f471f33b28278b1dd26d',
      name: 'HypnoVision',
      image:
        'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xabb0ca6ee85825f6d7f549ef36bf571484c157c5:0/thumbnail',
      url: '/contracts/0xabb0ca6ee85825f6d7f549ef36bf571484c157c5/tokens/16',
      data: {
        wearable: {
          description: 'Wearable by DaddyChang',
          category: WearableCategory.HELMET,
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
          rarity: Rarity.MYTHIC,
          isSmart: false
        }
      },
      issuedId: '16',
      itemId: '0',
      category: NFTCategory.WEARABLE,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_MAINNET,
      createdAt: 1626182617000,
      updatedAt: 1626246391000,
      soldAt: 1626246391000
    }

    testTypeSignature(NFT, wearable)

    it('static tests must pass', () => {
      expect(NFT.validate(wearable)).toEqual(true)
      expect(NFT.validate(null)).toEqual(false)
      expect(NFT.validate({})).toEqual(false)
    })
  })

  describe('ens', () => {
    const ens: NFT = {
      id: '0x2a187453064356c898cae034eaed119e1663acb8-20267204986233636871295784595277786190248304170965188964447216591051155494561',
      tokenId: '20267204986233636871295784595277786190248304170965188964447216591051155494561',
      contractAddress: '0x2a187453064356c898cae034eaed119e1663acb8',
      activeOrderId: '0x625dd3bd828a4060bc9bd049f2f06579cdae679f54e35e183e2152fe003c4569',
      openRentalId: null,
      owner: '0x61d2911f0986ce12f4dddb61575600a9d3593c03',
      name: 'Rumors',
      image: '',
      url: '/contracts/0x2a187453064356c898cae034eaed119e1663acb8/tokens/20267204986233636871295784595277786190248304170965188964447216591051155494561',
      data: {
        ens: {
          subdomain: 'Rumors'
        }
      },
      issuedId: null,
      itemId: null,
      category: NFTCategory.ENS,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_MAINNET,
      createdAt: 1626182617000,
      updatedAt: 1626246391000,
      soldAt: 1626246391000
    }

    testTypeSignature(NFT, ens)

    it('static tests must pass', () => {
      expect(NFT.validate(ens)).toEqual(true)
      expect(NFT.validate(null)).toEqual(false)
      expect(NFT.validate({})).toEqual(false)
    })
  })

  describe('emote', () => {
    const emote: NFT = {
      id: '0xabb0ca6ee85825f6d7f549ef36bf571484c157c5-16',
      tokenId: '16',
      contractAddress: '0xabb0ca6ee85825f6d7f549ef36bf571484c157c5',
      activeOrderId: '0x606a55e3aaa112d90a9474d73d8293dc8496d491eff32431b762a7ca46160fc0',
      openRentalId: null,
      owner: '0x3bec652537ebf756d9c5f471f33b28278b1dd26d',
      name: 'Head Explode',
      image:
        'https://peer.decentraland.org/lambdas/collections/contents/urn:decentraland:matic:collections-v2:0xabb0ca6ee85825f6d7f549ef36bf571484c157c5:0/thumbnail',
      url: '/contracts/0xabb0ca6ee85825f6d7f549ef36bf571484c157c5/tokens/16',
      data: {
        emote: {
          description: 'Some Description',
          category: EmoteCategory.DANCE,
          bodyShapes: [BodyShape.MALE, BodyShape.FEMALE],
          rarity: Rarity.MYTHIC,
          loop: false,
          hasSound: false,
          hasGeometry: false
        }
      },
      issuedId: '16',
      itemId: '0',
      category: NFTCategory.EMOTE,
      network: Network.ETHEREUM,
      chainId: ChainId.ETHEREUM_MAINNET,
      createdAt: 1626182617000,
      updatedAt: 1626246391000,
      soldAt: 1626246391000
    }

    testTypeSignature(NFT, emote)

    it('static tests must pass', () => {
      expect(NFT.validate(emote)).toEqual(true)
      expect(NFT.validate(null)).toEqual(false)
      expect(NFT.validate({})).toEqual(false)
    })
  })
})
