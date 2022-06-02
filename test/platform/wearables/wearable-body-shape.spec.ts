import expect from 'expect'
import { BodyShape } from '../../../src/platform'
import { testTypeSignature } from '../../test-utils'

describe('BodyShape tests', () => {
  const bodyShape: BodyShape = BodyShape.FEMALE

  testTypeSignature(BodyShape, bodyShape)

  it('static tests must pass', () => {
    expect(BodyShape.validate(bodyShape)).toEqual(true)
    expect(BodyShape.validate(null)).toEqual(false)
    expect(BodyShape.validate({})).toEqual(false)
  })
})
