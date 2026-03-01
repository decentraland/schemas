import { expect } from 'expect'
import { BodyShape, bodyShapeSchema } from '../../../src/platform'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateBodyShape = generateLazyValidator(bodyShapeSchema)

describe('BodyShape tests', () => {
  const bodyShape: BodyShape = BodyShape.FEMALE

  testTypeSignature({ schema: bodyShapeSchema }, bodyShape)

  it('static tests must pass', () => {
    expect(validateBodyShape(bodyShape)).toEqual(true)
    expect(validateBodyShape(null)).toEqual(false)
    expect(validateBodyShape({})).toEqual(false)
  })
})
