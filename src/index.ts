import * as sdk from './sdk/index.js'

export * from './dapps/index.js'
export * from './platform/index.js'
export * from './misc/index.js'
export * from './misc/linker-authorization.js'
export * from './misc/auth-chain.js'
export * from './misc/content-mapping.js'
export * from './misc/email.js'
export * from './core/index.js'
export { sdk }

// Re-export validation types (not runtime) for convenience
export type {
  ValidateFunction,
  JSONSchema,
  AbstractTypedSchema,
  KeywordDefinition,
  ValidationError
} from './validation/types.js'
