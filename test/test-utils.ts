import { expect } from 'expect'
import type { JSONSchema, ValidateFunction, KeywordDefinition } from '../src/validation/types.js'
import { generateLazyValidator } from '../src/validation/index.js'

export function testTypeSignature<T>(
  theType: { schema: JSONSchema<T>; keywordDefinitions?: KeywordDefinition[] },
  exampleValue: T
) {
  describe(`verifies that the shape of the type conforms the spec`, () => {
    const validate = generateLazyValidator(theType.schema, theType.keywordDefinitions)

    it('type has a "schema" object', () => {
      expect(typeof theType.schema).toEqual('object')
    })
    it('evaluate a valid example', () => {
      expect(validate(exampleValue)).toEqual(true)
    })
    it('evaluate an invalid example', () => {
      // I hope this is enough of a bad example, don't do this at home
      expect(
        validate({
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
