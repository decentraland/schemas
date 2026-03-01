import { expect } from 'expect'
import { PreviewType, previewTypeSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validatePreviewType = generateLazyValidator(previewTypeSchema)

describe('PreviewType tests', () => {
  const previewType: PreviewType = PreviewType.AVATAR

  testTypeSignature({ schema: previewTypeSchema }, previewType)

  it('static tests must pass', () => {
    expect(validatePreviewType(previewType)).toEqual(true)
    expect(validatePreviewType(null)).toEqual(false)
    expect(validatePreviewType({})).toEqual(false)
  })
})
