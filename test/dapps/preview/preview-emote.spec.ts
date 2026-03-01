import { expect } from 'expect'
import { PreviewEmote, previewEmoteSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validatePreviewEmote = generateLazyValidator(previewEmoteSchema)

describe('PreviewEmote tests', () => {
  const previewEmote: PreviewEmote = PreviewEmote.DAB

  testTypeSignature({ schema: previewEmoteSchema }, previewEmote)

  it('static tests must pass', () => {
    expect(validatePreviewEmote(previewEmote)).toEqual(true)
    expect(validatePreviewEmote(null)).toEqual(false)
    expect(validatePreviewEmote({})).toEqual(false)
  })
})
