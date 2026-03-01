import { expect } from 'expect'
import { type IPFSv2, ipfsv2Schema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateIPFSv2 = generateLazyValidator(ipfsv2Schema)

describe('Hashing tests', () => {
  const hash: IPFSv2 = 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'

  testTypeSignature({ schema: ipfsv2Schema }, hash)

  it('static tests must pass', () => {
    expect(validateIPFSv2(hash)).toEqual(true)
    expect(validateIPFSv2(null)).toEqual(false)
    expect(validateIPFSv2({})).toEqual(false)
  })
})
