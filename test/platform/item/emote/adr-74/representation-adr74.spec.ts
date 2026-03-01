import { expect } from 'expect'
import type { EmoteRepresentationADR74 } from '../../../../../src/platform/item'
import { BodyShape, emoteRepresentationADR74Schema } from '../../../../../src/platform/item'
import { expectValidationFailureWithErrors, testTypeSignature } from '../../../../test-utils'
import { generateLazyValidator } from '../../../../../src/validation/index.js'

const validateEmoteRepresentationADR74 = generateLazyValidator(emoteRepresentationADR74Schema)

describe('Emote representation tests', () => {
  const representation: EmoteRepresentationADR74 = {
    bodyShapes: [BodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2']
  }

  testTypeSignature({ schema: emoteRepresentationADR74Schema }, representation)

  it('static tests must pass', () => {
    expect(validateEmoteRepresentationADR74(representation)).toEqual(true)
    expect(validateEmoteRepresentationADR74(null)).toEqual(false)
    expect(validateEmoteRepresentationADR74({})).toEqual(false)
  })

  it('representation without body shape fails', () => {
    expectValidationFailureWithErrors(
      validateEmoteRepresentationADR74,
      {
        ...representation,
        bodyShapes: []
      },
      ['must NOT have fewer than 1 items']
    )
  })

  it('representation with repeated body shapes fails', () => {
    expectValidationFailureWithErrors(
      validateEmoteRepresentationADR74,
      {
        ...representation,
        bodyShapes: [BodyShape.FEMALE, BodyShape.FEMALE]
      },
      ['must NOT have duplicate items (items ## 1 and 0 are identical)']
    )
  })

  it('representation without content fails', () => {
    expectValidationFailureWithErrors(
      validateEmoteRepresentationADR74,
      {
        ...representation,
        contents: []
      },
      ['must NOT have fewer than 1 items', 'contents should contain mainFile: "file1"']
    )
  })

  it('representation with repeated content fails', () => {
    expectValidationFailureWithErrors(
      validateEmoteRepresentationADR74,
      {
        ...representation,
        contents: ['file1', 'file1']
      },
      ['must NOT have duplicate items (items ## 1 and 0 are identical)']
    )
  })

  it('main file not in contents fails', () => {
    expectValidationFailureWithErrors(
      validateEmoteRepresentationADR74,
      {
        ...representation,
        mainFile: 'file1',
        contents: ['file2', 'file3']
      },
      ['contents should contain mainFile: "file1"']
    )
  })
})
