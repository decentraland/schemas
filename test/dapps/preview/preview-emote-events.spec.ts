import expect from 'expect'
import { PreviewEmoteEventType } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewEmoteEvents tests', () => {
  const previewEmoteEvent: PreviewEmoteEventType = PreviewEmoteEventType.ANIMATION_PLAY

  testTypeSignature(PreviewEmoteEventType, previewEmoteEvent)

  it('static tests must pass', () => {
    expect(PreviewEmoteEventType.validate(previewEmoteEvent)).toEqual(true)
    expect(PreviewEmoteEventType.validate(null)).toEqual(false)
    expect(PreviewEmoteEventType.validate({})).toEqual(false)
  })
})
