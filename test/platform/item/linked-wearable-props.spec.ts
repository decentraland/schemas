import expect from 'expect'
import { testTypeSignature } from '../../test-utils'
import { AllMapping, Mapping, MultipleMapping, RangeMapping, SingleMapping } from '../../../src'

const singleMapping: SingleMapping = {
  type: 'single',
  id: '1'
}

const allMapping: AllMapping = {
  type: 'all'
}

const multipleMapping: MultipleMapping = {
  type: 'multiple',
  ids: ['1', '3']
}

const rangeMapping: RangeMapping = {
  type: 'range',
  from: '1',
  to: '9'
}

describe('Linked Wearable Props tests', () => {
  testTypeSignature(Mapping, singleMapping)

  it('static tests must pass', () => {
    expect(Mapping.validate(singleMapping)).toEqual(true)
    expect(Mapping.validate(null)).toEqual(false)
    expect(Mapping.validate({})).toEqual(false)
  })

  describe('no extra properties allowed', () => {
    const testFn = ({ mapping, expected }: { mapping: any; expected: boolean }) =>
      function () {
        expect(Mapping.validate({ ...mapping, extra: 'extra' })).toEqual(expected)
      }

    it('for type: single', testFn({ mapping: singleMapping, expected: false }))
    it('for type: multiple', testFn({ mapping: multipleMapping, expected: false }))
    it('for type: all', testFn({ mapping: allMapping, expected: false }))
    it('for type: range', testFn({ mapping: rangeMapping, expected: false }))
  })

  it('static tests must return the correct errors when missing properties', () => {
    expect(Mapping.validate({})).toEqual(false)
    expect(Mapping.validate({ type: 'single' })).toEqual(false)
    expect(Mapping.validate({ type: 'multiple' })).toEqual(false)
    expect(Mapping.validate({ type: 'range' })).toEqual(false)
    expect(Mapping.validate({ type: 'all' })).toEqual(true)
  })
})
