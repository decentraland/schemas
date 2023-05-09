import expect from 'expect'
import { AbstractTypedSchema, ValidateFunction, validateType } from '../src'

export function testTypeSignature<T>(theType: AbstractTypedSchema<T>, exampleValue: T) {
  describe(`verifies that the shape of the type conforms the spec`, () => {
    it('type has a "schema" object', () => {
      expect(typeof theType.schema).toEqual('object')
    })
    it('type has a "validate" function', () => {
      expect(typeof theType.validate).toEqual('function')
    })
    it('evaluate a valid example', () => {
      expect(theType.validate(exampleValue)).toEqual(true)
      expect(validateType(theType, exampleValue)).toEqual(true)
    })
    it('evaluate an invalid example', () => {
      // I hope this is enough of a bad example, don't do this at home
      expect(
        theType.validate({
          [Math.random()]: Math.random(),
          [Math.random() + 'asd']: null,
          [Math.random() + 'asd']: { a: null }
        })
      ).toEqual(false)
    })
  })
}

export function expectValidationFailureWithErrors<T>(
  validateFn: ValidateFunction<T>,
  dataToValidate: any,
  expectedErrorMessages: string[]
) {
  const validationResult = validateFn(dataToValidate)
  expect(validationResult).toBe(false)
  const messages = validateFn.errors ? validateFn.errors.map((e) => e.message) : []
  for (const e of expectedErrorMessages) {
    expect(messages).toContain(e)
  }
}
