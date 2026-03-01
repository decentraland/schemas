import { expect } from 'expect'
import { PreviewEmoteEventType, previewEmoteEventTypeSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validatePreviewEmoteEventType = generateLazyValidator(previewEmoteEventTypeSchema)

describe('PreviewEmoteEvents tests', () => {
  const previewEmoteEvent: PreviewEmoteEventType = PreviewEmoteEventType.ANIMATION_PLAY

  testTypeSignature({ schema: previewEmoteEventTypeSchema }, previewEmoteEvent)

  it('static tests must pass', () => {
    expect(validatePreviewEmoteEventType(previewEmoteEvent)).toEqual(true)
    expect(validatePreviewEmoteEventType(null)).toEqual(false)
    expect(validatePreviewEmoteEventType({})).toEqual(false)
  })
})
