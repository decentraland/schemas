import { expect } from 'expect'
import type { Source } from '../../../src'
import { sourceSchema } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateSource = generateLazyValidator(sourceSchema)

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

  testTypeSignature({ schema: sourceSchema }, source)

  it('static tests must pass', () => {
    expect(validateSource(source)).toEqual(true)
    expect(validateSource(null)).toEqual(false)
    expect(validateSource({})).toEqual(false)
  })

  it('non-integer number fails on point', () => {
    expect(
      validateSource({
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
      validateSource({
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
      validateSource({
        ...source,
        rotation: 'invalid'
      })
    ).toEqual(false)
  })
})
