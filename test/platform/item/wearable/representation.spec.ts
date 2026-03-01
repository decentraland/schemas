import { expect } from 'expect'
import type { WearableRepresentation } from '../../../../src'
import { BodyShape, wearableRepresentationSchema } from '../../../../src'
import { testTypeSignature } from '../../../test-utils'
import { generateLazyValidator } from '../../../../src/validation/index.js'

const validateWearableRepresentation = generateLazyValidator(wearableRepresentationSchema)

describe('Wearable representation tests', () => {
  const representation: WearableRepresentation = {
    bodyShapes: [BodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2'],
    overrideHides: [],
    overrideReplaces: []
  }

  testTypeSignature({ schema: wearableRepresentationSchema }, representation)

  it('static tests must pass', () => {
    expect(validateWearableRepresentation(representation)).toEqual(true)
    expect(validateWearableRepresentation(null)).toEqual(false)
    expect(validateWearableRepresentation({})).toEqual(false)
  })

  it('representation without body shape fails', () => {
    expect(
      validateWearableRepresentation({
        ...representation,
        bodyShapes: []
      })
    ).toEqual(false)
  })

  it('representation with repeated body shapes fails', () => {
    expect(
      validateWearableRepresentation({
        ...representation,
        bodyShapes: [BodyShape.FEMALE, BodyShape.FEMALE]
      })
    ).toEqual(false)
  })

  it('representation without content fails', () => {
    expect(
      validateWearableRepresentation({
        ...representation,
        contents: []
      })
    ).toEqual(false)
  })

  it('representation with repeated content fails', () => {
    expect(
      validateWearableRepresentation({
        ...representation,
        contents: ['file1', 'file1']
      })
    ).toEqual(false)
  })

  it('main file not in contents fails', () => {
    expect(
      validateWearableRepresentation({
        ...representation,
        mainFile: 'file1',
        contents: ['file2', 'file3']
      })
    ).toEqual(false)
  })
})
