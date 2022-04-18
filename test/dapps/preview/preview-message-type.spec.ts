import expect from 'expect'
import { PreviewMessageType } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewMessageType tests', () => {
  const previewMessageType: PreviewMessageType = PreviewMessageType.LOAD

  testTypeSignature(PreviewMessageType, previewMessageType)

  it('static tests must pass', () => {
    expect(PreviewMessageType.validate(previewMessageType)).toEqual(true)
    expect(PreviewMessageType.validate(null)).toEqual(false)
    expect(PreviewMessageType.validate({})).toEqual(false)
  })
})
