import expect from 'expect'
import {
  Locale,
  Rarity,
  Wearable,
  WearableBodyShape,
  WearableCategory,
  WearableRepresentation
} from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Representation tests', () => {
  const representation: WearableRepresentation = {
    bodyShapes: [WearableBodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2'],
    overrideHides: [],
    overrideReplaces: []
  }

  const wearable: Wearable = {
    id: 'some id',
    descriptions: [
      {
        code: Locale.EN,
        text: 'some description'
      },
      {
        code: Locale.ES,
        text: 'una descripcion'
      }
    ],
    collectionAddress: '0x...',
    rarity: Rarity.LEGENDARY,
    names: [
      {
        code: Locale.EN,
        text: 'name'
      }
    ],
    data: {
      replaces: [],
      hides: [],
      tags: ['tag1'],
      representations: [representation],
      category: WearableCategory.UPPER_BODY
    },
    thumbnail: 'thumbnail.png',
    image: 'image.png'
  }

  testTypeSignature(Wearable, wearable)

  it('static tests must pass', () => {
    expect(Wearable.validate(wearable)).toEqual(true)
    expect(Wearable.validate(null)).toEqual(false)
    expect(Wearable.validate({})).toEqual(false)
  })

  it('wearable with two names with same locale fails', () => {
    expect(
      Wearable.validate({
        ...wearable,
        names: [
          { code: Locale.ES, text: 'texto' },
          { code: Locale.ES, text: 'otro texto' }
        ]
      })
    ).toEqual(false)
  })

  it('wearable with two descriptions with same locale fails', () => {
    expect(
      Wearable.validate({
        ...wearable,
        descriptions: [
          { code: Locale.ES, text: 'texto' },
          { code: Locale.ES, text: 'otro texto' }
        ]
      })
    ).toEqual(false)
  })

  it('wearable without representation fails', () => {
    expect(
      Wearable.validate({
        ...wearable,
        data: {
          ...wearable.data,
          representations: []
        }
      })
    ).toEqual(false)
  })

  it('wearable without name fails', () => {
    expect(
      Wearable.validate({
        ...wearable,
        name: []
      })
    ).toEqual(false)
  })

  it('wearable without description fails', () => {
    expect(
      Wearable.validate({
        ...wearable,
        description: []
      })
    ).toEqual(false)
  })
})
