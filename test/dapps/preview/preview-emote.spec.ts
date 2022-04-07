import expect from 'expect'
import { PreviewEmote } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewEmote tests', () => {
  const previewEmote: PreviewEmote = PreviewEmote.DAB

  testTypeSignature(PreviewEmote, previewEmote)

  it('static tests must pass', () => {
    expect(PreviewEmote.validate(previewEmote)).toEqual(true)
    expect(PreviewEmote.validate(null)).toEqual(false)
    expect(PreviewEmote.validate({})).toEqual(false)
  })
})
