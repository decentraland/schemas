import expect from 'expect'
import { expectValidationFailureWithErrors, testTypeSignature } from '../../test-utils'
import {
  AnyMapping,
  ContractNetwork,
  createMappingsHelper,
  Mapping,
  Mappings,
  MappingsHelper,
  MappingType,
  MultipleMapping,
  RangeMapping,
  SingleMapping
} from '../../../src'

const mappings: Mappings = {
  [ContractNetwork.MATIC]: {
    '0x1234567890123456789012345678901234567890': [
      { type: MappingType.SINGLE, id: '1' },
      { type: MappingType.MULTIPLE, ids: ['5', '7'] },
      { type: MappingType.RANGE, from: '10', to: '19' }
    ]
  }
}

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

describe('Third Party Mappings tests', () => {
  testTypeSignature(Mappings, mappings)

  it('static tests must pass', () => {
    expect(Mappings.validate(mappings)).toEqual(true)
    expect(Mappings.validate(null)).toEqual(false)
    expectValidationFailureWithErrors(Mappings.validate, {}, ['must NOT have fewer than 1 properties'])
    expectValidationFailureWithErrors(
      Mappings.validate,
      {
        amoy: {
          '0x1d9fb685c257E74f869BA302e260C0b68f5eBB37': [
            { type: MappingType.ANY },
            { type: MappingType.SINGLE, id: '0' }
          ]
        }
      },
      ['must pass "_isMappingsValid" keyword validation']
    )
  })
})

describe('Third Party tests - each individual mapping type', () => {
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

  describe('mapping helper', () => {
    let helper: MappingsHelper

    beforeEach(() => {
      helper = createMappingsHelper()
    })

    it('should add a single mapping', () => {
      helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '1')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '2')).toBeFalsy()
      expect(helper.includesNft(ContractNetwork.MATIC, '0x123', '2')).toBeFalsy()
    })

    it('should add an all mapping', () => {
      helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '1')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '9834')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MATIC, '0x123', '2')).toBeFalsy()
    })

    it('should add a multiple mapping', () => {
      helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '1')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '2')).toBeFalsy()
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '3')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MATIC, '0x123', '2')).toBeFalsy()
    })

    it('should add a range mapping', () => {
      helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '1')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '2')).toBeTruthy()
      expect(helper.includesNft(ContractNetwork.MAINNET, '0x123', '10')).toBeFalsy()
      expect(helper.includesNft(ContractNetwork.MATIC, '0x123', '2')).toBeFalsy()
    })

    describe('should fail to add overlapping mappings', () => {
      describe('single with', () => {
        it('single', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)).toThrowError()
        })

        it('all', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)).toThrowError()
        })

        it('multiple', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)).toThrowError()
        })

        it('range', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)).toThrowError()
        })
      })

      describe('all with', () => {
        it('single', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)).toThrowError()
        })

        it('all', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)).toThrowError()
        })

        it('multiple', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)).toThrowError()
        })

        it('range', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)).toThrowError()
        })
      })

      describe('multiple with', () => {
        it('single', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)).toThrowError()
        })

        it('all', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)).toThrowError()
        })

        it('multiple', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)).toThrowError()
        })

        it('range', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)).toThrowError()
        })
      })

      describe('range with', () => {
        it('single', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', singleMapping)).toThrowError()
        })

        it('all', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', allMapping)).toThrowError()
        })

        it('multiple', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', multipleMapping)).toThrowError()
        })

        it('range', () => {
          helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)
          expect(() => helper.addMapping(ContractNetwork.MAINNET, '0x123', rangeMapping)).toThrowError()
        })
      })
    })
  })
})
