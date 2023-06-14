import expect from 'expect'
import { Outfits, WearableCategory } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'

const OUTFITS: Outfits = {
  outfits: [
    {
      slot: 1,
      outfit: {
        bodyShape: 'urn:decentraland:off-chain:base-avatars:BaseMale',
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
    }
  ],
  namesForExtraSlots: ['someName']
}

it('outfits is valid', () => {
  testTypeSignature(Outfits, OUTFITS)
  expect(Outfits.validate(OUTFITS)).toEqual(true)
})

it('outfits with forceRender is valid', () => {
  OUTFITS.outfits[0].outfit.forceRender = [WearableCategory.EYEBROWS]
  testTypeSignature(Outfits, OUTFITS)
  expect(Outfits.validate(OUTFITS)).toEqual(true)
})

it('null outfits is invalid', () => {
  expect(Outfits.validate(null)).toEqual(false)
})

it('empty object outfits is invalid', () => {
  expect(Outfits.validate({})).toEqual(false)
})

it('empty object outfits is invalid', () => {
  expect(Outfits.validate({})).toEqual(false)
})

it('outfits without outfits is valid', () => {
  expect(
    Outfits.validate({
      outfits: [],
      namesForExtraSlots: []
    })
  ).toEqual(true)
})

it('outfit without bodyShape is invalid', () => {
  const outfit = OUTFITS.outfits[0].outfit
  const outfitWithoutBodyShape = {
    eyes: outfit.eyes,
    hair: outfit.hair,
    skin: outfit.skin,
    wearables: outfit.wearables
  }
  expect(
    Outfits.validate({
      outfits: [{ slot: 1, outfit: outfitWithoutBodyShape }]
    })
  ).toEqual(false)
})

it('outfit without eyes is invalid', () => {
  const outfit = OUTFITS.outfits[0].outfit
  const outfitWithoutEyes = {
    bodyShape: outfit.bodyShape,
    hair: outfit.hair,
    skin: outfit.skin,
    wearables: outfit.wearables
  }
  expect(
    Outfits.validate({
      outfits: [{ slot: 1, outfit: outfitWithoutEyes }]
    })
  ).toEqual(false)
})

it('outfit without hair is invalid', () => {
  const outfit = OUTFITS.outfits[0].outfit
  const outfitWithoutHair = {
    bodyShape: outfit.bodyShape,
    eyes: outfit.eyes,
    skin: outfit.skin,
    wearables: outfit.wearables
  }
  expect(
    Outfits.validate({
      outfits: [{ slot: 1, outfit: outfitWithoutHair }]
    })
  ).toEqual(false)
})

it('outfit without skin is invalid', () => {
  const outfit = OUTFITS.outfits[0].outfit
  const outfitWithoutSkin = {
    bodyShape: outfit.bodyShape,
    eyes: outfit.eyes,
    hair: outfit.hair,
    wearables: outfit.wearables
  }
  expect(
    Outfits.validate({
      outfits: [{ slot: 1, outfit: outfitWithoutSkin }]
    })
  ).toEqual(false)
})

it('outfit without wearables is invalid', () => {
  const outfit = OUTFITS.outfits[0].outfit
  const outfitWithoutWearables = {
    bodyShape: outfit.bodyShape,
    eyes: outfit.eyes,
    hair: outfit.hair,
    skin: outfit.skin
  }
  expect(
    Outfits.validate({
      outfits: [{ slot: 1, outfit: outfitWithoutWearables }]
    })
  ).toEqual(false)
})

it('outfit with repeated names is invalid', () => {
  const someName = 'someName'
  const outfits: Outfits = {
    outfits: OUTFITS.outfits,
    namesForExtraSlots: [someName, someName]
  }
  expect(Outfits.validate(outfits)).toEqual(false)
})
