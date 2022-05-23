import expect from 'expect'
import { PreviewEnv } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewEnv tests', () => {
  const previewEnv: PreviewEnv = PreviewEnv.PROD

  testTypeSignature(PreviewEnv, previewEnv)

  it('static tests must pass', () => {
    expect(PreviewEnv.validate(previewEnv)).toEqual(true)
    expect(PreviewEnv.validate(null)).toEqual(false)
    expect(PreviewEnv.validate({})).toEqual(false)
  })
})
