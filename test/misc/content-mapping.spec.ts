import expect from 'expect'
import { ContentMapping } from '../../src'

describe('Content mapping', () => {
  it('sanity', () => {
    expect(ContentMapping.validate({})).toEqual(false)
    expect(ContentMapping.validate({ file: '', hash: '' })).toEqual(false)
    expect(ContentMapping.validate({ file: 'a', hash: 'a' })).toEqual(false)
    expect(
      ContentMapping.validate({
        file: 'a',
        hash: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo'
      })
    ).toEqual(true)
    expect(
      ContentMapping.validate({
        file: '',
        hash: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo'
      })
    ).toEqual(false)
    expect(
      ContentMapping.validate({
        file: 'a',
        hash: 'QmUsqJaHc5HQaBrojhBdjF4fr5MQc6CqhwZjqwhVRftNAo-INVALID'
      })
    ).toEqual(false)
    expect(
      ContentMapping.validate({
        file: 'a',
        hash: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'
      })
    ).toEqual(true)
    expect(
      ContentMapping.validate({
        file: '',
        hash: 'bafybeiasb5vpmaounyilfuxbd3lryvosl4yefqrfahsb2esg46q6tu6y5q'
      })
    ).toEqual(false)
  })
})
