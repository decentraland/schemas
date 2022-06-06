import expect from 'expect'
import {
  BodyShape,
  EmoteRepresentationADR73
} from '../../../../../src/platform/item'
import { testTypeSignature } from '../../../../test-utils'

describe('Emote representation tests', () => {
  const representation: EmoteRepresentationADR73 = {
    bodyShapes: [BodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2']
  }

  testTypeSignature(EmoteRepresentationADR73, representation)

  it('static tests must pass', () => {
    expect(EmoteRepresentationADR73.validate(representation)).toEqual(true)
    expect(EmoteRepresentationADR73.validate(null)).toEqual(false)
    expect(EmoteRepresentationADR73.validate({})).toEqual(false)
  })

  it('representation without body shape fails', () => {
    expect(
      EmoteRepresentationADR73.validate({
        ...representation,
        bodyShapes: []
      })
    ).toEqual(false)
  })

  it('representation with repeated body shapes fails', () => {
    expect(
      EmoteRepresentationADR73.validate({
        ...representation,
        bodyShapes: [BodyShape.FEMALE, BodyShape.FEMALE]
      })
    ).toEqual(false)
  })

  it('representation without content fails', () => {
    expect(
      EmoteRepresentationADR73.validate({
        ...representation,
        contents: []
      })
    ).toEqual(false)
  })

  it('representation with repeated content fails', () => {
    expect(
      EmoteRepresentationADR73.validate({
        ...representation,
        contents: ['file1', 'file1']
      })
    ).toEqual(false)
  })

  it('main file not in contents fails', () => {
    expect(
      EmoteRepresentationADR73.validate({
        ...representation,
        mainFile: 'file1',
        contents: ['file2', 'file3']
      })
    ).toEqual(false)
  })
})
