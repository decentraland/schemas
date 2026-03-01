import { expect } from 'expect'
import { PreviewProjection, previewProjectionSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validatePreviewProjection = generateLazyValidator(previewProjectionSchema)

describe('PreviewProjection tests', () => {
  const previewProjection: PreviewProjection = PreviewProjection.PERSPECTIVE

  testTypeSignature({ schema: previewProjectionSchema }, previewProjection)

  it('static tests must pass', () => {
    expect(validatePreviewProjection(previewProjection)).toEqual(true)
    expect(validatePreviewProjection(null)).toEqual(false)
    expect(validatePreviewProjection({})).toEqual(false)
  })
})
