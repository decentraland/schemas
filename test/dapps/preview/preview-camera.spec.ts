import expect from 'expect'
import { PreviewCamera } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewCamera tests', () => {
  const previewCamera: PreviewCamera = PreviewCamera.INTERACTIVE

  testTypeSignature(PreviewCamera, previewCamera)

  it('static tests must pass', () => {
    expect(PreviewCamera.validate(previewCamera)).toEqual(true)
    expect(PreviewCamera.validate(null)).toEqual(false)
    expect(PreviewCamera.validate({})).toEqual(false)
  })
})
