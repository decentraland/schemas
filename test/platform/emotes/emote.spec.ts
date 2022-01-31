import expect from 'expect'
import {
  Emote,
  EmoteData,
  EmoteRepresentation,
  I18N,
  Locale,
  Rarity,
  WearableBodyShape
} from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Emote Locale tests', () => {
  const emoteData: EmoteData = { loop: false, thumbnail: 'thumbnailUrl' }
  const description: I18N = { code: Locale.EN, text: 'description' }
  const name: I18N = { code: Locale.EN, text: 'description' }
  const representation: EmoteRepresentation = {
    bodyShapes: [WearableBodyShape.FEMALE],
    mainFile: 'mainfile',
    data: null
  }
  const emote: Emote = {
    id: 'id',
    collectionAddress: '0x1F9834AB34',
    contents: ['mainfile'],
    data: emoteData,
    descriptions: [description],
    names: [name],
    rarity: Rarity.COMMON,
    representations: [representation],
    tags: [],
    version: '1'
  }

  testTypeSignature(Emote, emote)

  it('repeated locale in descriptions must fail', () => {
    const newEmote = JSON.parse(JSON.stringify(emote))
    const otherDescription: I18N = {
      code: Locale.EN,
      text: 'other description'
    }
    newEmote.descriptions = [description, otherDescription]
    expect(Emote.validate(newEmote)).toEqual(false)
  })

  it('repeated locale in names must fail', () => {
    const newEmote = JSON.parse(JSON.stringify(emote))
    const otherName: I18N = { code: Locale.EN, text: 'other name' }
    newEmote.descriptions = [description, otherName]
    expect(Emote.validate(newEmote)).toEqual(false)
  })

  it('no representation mainfile in contents must fail', () => {
    const newEmote = JSON.parse(JSON.stringify(emote))
    newEmote.representations[0].mainFile = 'otherMainFile'
    expect(Emote.validate(newEmote)).toEqual(false)
  })

  it('no version must fail', () => {
    const newEmote = JSON.parse(JSON.stringify(emote))
    newEmote.version = ''
    expect(Emote.validate(newEmote)).toEqual(false)
  })
})
