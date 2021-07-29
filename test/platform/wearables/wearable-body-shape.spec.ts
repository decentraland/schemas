import expect from 'expect'
import { WearableBodyShape } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('BodyShape tests', () => {
  const bodyShape: WearableBodyShape = WearableBodyShape.FEMALE

  testTypeSignature(WearableBodyShape, bodyShape)

  it('static tests must pass', () => {
    expect(WearableBodyShape.validate(bodyShape)).toEqual(true)
    expect(WearableBodyShape.validate(null)).toEqual(false)
    expect(WearableBodyShape.validate({})).toEqual(false)
  })
})
