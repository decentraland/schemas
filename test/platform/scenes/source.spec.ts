import expect from 'expect'
import { Source } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Source tests', () => {
  const source: Source = {
    version: 1,
    origin: 'origin',
    projectId: 'some-id',
    point: { x: 10, y: 20 },
    rotation: 'north',
    layout: { rows: 2, cols: 3 },
    isEmpty: false
  }

  testTypeSignature(Source, source)

  it('static tests must pass', () => {
    expect(Source.validate(source)).toEqual(true)
    expect(Source.validate(null)).toEqual(false)
    expect(Source.validate({})).toEqual(false)
  })

  it('non-integer number fails on point', () => {
    expect(
      Source.validate({
        ...source,
        point: {
          x: 1.1,
          y: 20
        }
      })
    ).toEqual(false)
  })

  it('non-integer number fails on layout', () => {
    expect(
      Source.validate({
        ...source,
        layout: {
          rows: 1.1,
          cols: 3
        }
      })
    ).toEqual(false)
  })

  it('invalid string on rotation fails', () => {
    expect(
      Source.validate({
        ...source,
        rotation: 'invalid'
      })
    ).toEqual(false)
  })
})
