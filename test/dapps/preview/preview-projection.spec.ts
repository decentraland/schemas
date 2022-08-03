import expect from 'expect'
import { PreviewProjection } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewProjection tests', () => {
  const previewProjection: PreviewProjection = PreviewProjection.PERSPECTIVE

  testTypeSignature(PreviewProjection, previewProjection)

  it('static tests must pass', () => {
    expect(PreviewProjection.validate(previewProjection)).toEqual(true)
    expect(PreviewProjection.validate(null)).toEqual(false)
    expect(PreviewProjection.validate({})).toEqual(false)
  })
})
