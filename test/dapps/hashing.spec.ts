import expect from 'expect'
import { IPFSv2 } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Hashing tests', () => {
  const hash: IPFSv2 = 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'

  testTypeSignature(IPFSv2, hash)

  it('static tests must pass', () => {
    expect(IPFSv2.validate(hash)).toEqual(true)
    expect(IPFSv2.validate(null)).toEqual(false)
    expect(IPFSv2.validate({})).toEqual(false)
  })
})
