import expect from 'expect'
import { PreviewType } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewType tests', () => {
  const previewType: PreviewType = PreviewType.AVATAR

  testTypeSignature(PreviewType, previewType)

  it('static tests must pass', () => {
    expect(PreviewType.validate(previewType)).toEqual(true)
    expect(PreviewType.validate(null)).toEqual(false)
    expect(PreviewType.validate({})).toEqual(false)
  })
})
