import expect from 'expect'
import { BodyShape, EmoteRepresentationADR74 } from '../../../../../src/platform/item'
import { expectValidationFailureWithErrors, testTypeSignature } from '../../../../test-utils'

describe('Emote representation tests', () => {
  const representation: EmoteRepresentationADR74 = {
    bodyShapes: [BodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2']
  }

  testTypeSignature(EmoteRepresentationADR74, representation)

  it('static tests must pass', () => {
    expect(EmoteRepresentationADR74.validate(representation)).toEqual(true)
    expect(EmoteRepresentationADR74.validate(null)).toEqual(false)
    expect(EmoteRepresentationADR74.validate({})).toEqual(false)
  })

  it('representation without body shape fails', () => {
    expectValidationFailureWithErrors(
      EmoteRepresentationADR74.validate,
      {
        ...representation,
        bodyShapes: []
      },
      ['must NOT have fewer than 1 items']
    )
  })

  it('representation with repeated body shapes fails', () => {
    expectValidationFailureWithErrors(
      EmoteRepresentationADR74.validate,
      {
        ...representation,
        bodyShapes: [BodyShape.FEMALE, BodyShape.FEMALE]
      },
      ['must NOT have duplicate items (items ## 1 and 0 are identical)']
    )
  })

  it('representation without content fails', () => {
    expectValidationFailureWithErrors(
      EmoteRepresentationADR74.validate,
      {
        ...representation,
        contents: []
      },
      ['must NOT have fewer than 1 items', 'contents should contain mainFile: "file1"']
    )
  })

  it('representation with repeated content fails', () => {
    expectValidationFailureWithErrors(
      EmoteRepresentationADR74.validate,
      {
        ...representation,
        contents: ['file1', 'file1']
      },
      ['must NOT have duplicate items (items ## 1 and 0 are identical)']
    )
  })

  it('main file not in contents fails', () => {
    expectValidationFailureWithErrors(
      EmoteRepresentationADR74.validate,
      {
        ...representation,
        mainFile: 'file1',
        contents: ['file2', 'file3']
      },
      ['contents should contain mainFile: "file1"']
    )
  })
})
