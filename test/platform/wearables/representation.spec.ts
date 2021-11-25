import expect from 'expect'
import { WearableBodyShape, WearableRepresentation } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Representation tests', () => {
  const representation: WearableRepresentation = {
    bodyShapes: [WearableBodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2'],
    overrideHides: [],
    overrideReplaces: []
  }

  testTypeSignature(WearableRepresentation, representation)

  it('static tests must pass', () => {
    expect(WearableRepresentation.validate(representation)).toEqual(true)
    expect(WearableRepresentation.validate(null)).toEqual(false)
    expect(WearableRepresentation.validate({})).toEqual(false)
  })

  it('representation without body shape fails', () => {
    expect(
      WearableRepresentation.validate({
        ...representation,
        bodyShapes: []
      })
    ).toEqual(false)
  })

  it('representation with repeated body shapes fails', () => {
    expect(
      WearableRepresentation.validate({
        ...representation,
        bodyShapes: [WearableBodyShape.FEMALE, WearableBodyShape.FEMALE]
      })
    ).toEqual(false)
  })

  it('representation without content fails', () => {
    expect(
      WearableRepresentation.validate({
        ...representation,
        contents: []
      })
    ).toEqual(false)
  })

  it('representation with repeated content fails', () => {
    expect(
      WearableRepresentation.validate({
        ...representation,
        contents: ['file1', 'file1']
      })
    ).toEqual(false)
  })

  it('main file not in contents fails', () => {
    expect(
      WearableRepresentation.validate({
        ...representation,
        mainFile: ['file1'],
        contents: ['file2', 'file3']
      })
    ).toEqual(false)
  })
})
