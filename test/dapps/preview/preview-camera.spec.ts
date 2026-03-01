import { expect } from 'expect'
import { PreviewCamera, previewCameraSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validatePreviewCamera = generateLazyValidator(previewCameraSchema)

describe('PreviewCamera tests', () => {
  const previewCamera: PreviewCamera = PreviewCamera.INTERACTIVE

  testTypeSignature({ schema: previewCameraSchema }, previewCamera)

  it('static tests must pass', () => {
    expect(validatePreviewCamera(previewCamera)).toEqual(true)
    expect(validatePreviewCamera(null)).toEqual(false)
    expect(validatePreviewCamera({})).toEqual(false)
  })
})
