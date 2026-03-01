import { expect } from 'expect'
import { contentMappingSchema } from '../../src'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateContentMapping = generateLazyValidator(contentMappingSchema)

describe('Content mapping', () => {
  it('sanity', () => {
    expect(validateContentMapping({})).toEqual(false)
    expect(validateContentMapping({ file: '', hash: '' })).toEqual(false)
    expect(validateContentMapping({ file: 'a', hash: 'a' })).toEqual(false)
    expect(
      validateContentMapping({
        file: 'a',
        hash: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo'
      })
    ).toEqual(true)
    expect(
      validateContentMapping({
        file: '',
        hash: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo'
      })
    ).toEqual(false)
    expect(
      validateContentMapping({
        file: 'a',
        hash: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo-INVALID'
      })
    ).toEqual(false)
    expect(
      validateContentMapping({
        file: 'a',
        hash: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'
      })
    ).toEqual(true)
    expect(
      validateContentMapping({
        file: '',
        hash: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'
      })
    ).toEqual(false)
  })
})
