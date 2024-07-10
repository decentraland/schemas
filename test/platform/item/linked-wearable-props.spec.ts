import expect from 'expect'
import { testTypeSignature } from '../../test-utils'
import { AnyMapping, Mapping, MultipleMapping, RangeMapping, SingleMapping } from '../../../src'
import { MappingType } from '../../../src'

const singleMapping: SingleMapping = {
  type: MappingType.SINGLE,
  id: '1'
}

const allMapping: AnyMapping = {
  type: MappingType.ANY
}

const multipleMapping: MultipleMapping = {
  type: MappingType.MULTIPLE,
  ids: ['1', '3']
}

const rangeMapping: RangeMapping = {
  type: MappingType.RANGE,
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
    expect(Mapping.validate({ type: MappingType.SINGLE })).toEqual(false)
    expect(Mapping.validate({ type: MappingType.MULTIPLE })).toEqual(false)
    expect(Mapping.validate({ type: MappingType.RANGE })).toEqual(false)
    expect(Mapping.validate({ type: MappingType.ANY })).toEqual(true)
  })

  it('range mapping with from greater than to fails validation', () => {
    expect(
      Mapping.validate({
        type: MappingType.RANGE,
        from: '11',
        to: '1'
      })
    ).toEqual(false)
  })

  it('multiple mapping with duplicate ids fails validation', () => {
    expect(
      Mapping.validate({
        type: MappingType.MULTIPLE,
        ids: ['1', '3', '1']
      })
    ).toEqual(false)
  })
})
