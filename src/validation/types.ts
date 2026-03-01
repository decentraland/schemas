/**
 * Validation error from schema validation.
 * @public
 */
export interface ValidationError {
  keyword: string
  instancePath: string
  schemaPath: string
  params: Record<string, any>
  message?: string
}

/**
 * This type is a subset of AJV's ValidateFunction, it exists to make
 * .d.ts bundles smaller and to not expose all of AJV context to the
 * world.
 * @public
 */
export interface ValidateFunction<T = unknown> {
  (this: any, data: any, dataCxt?: any): data is T
  errors?: null | ValidationError[]
}

/**
 * This type alias exist only to avoid accidental refactors involving names of ajv
 * @public
 */
// T is an intentional phantom type parameter for compile-time type safety
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type JSONSchema<T = unknown> = Record<string, any>

/**
 * Common structure to use types as values in TS.
 * @public
 */
export type AbstractTypedSchema<T> = {
  schema: JSONSchema<T>
  validate: ValidateFunction<T>
}

/**
 * Keyword definition for custom AJV keywords.
 * @public
 */
export interface KeywordDefinition {
  keyword: string
  type?: string
  validate?: (...args: any[]) => boolean
  errors?: boolean
  [key: string]: any
}
