# @dcl/schemas

Decentraland data structure interfaces and validators for TypeScript-based projects.

```bash
npm i @dcl/schemas
```

## Design Guidelines

- Prevent type problems across projects
- Fail as early as possible, aim for compile-time
- Preserve user optionality through runtime helpers
- Every export is tree-shakeable — consumers only pay for what they import
- Code is written once, read hundreds of times

Implementation decisions:

- Types are PascalCase (`ChainId`, `Rarity`, `NFT`)
- Schemas are camelCase type name + `Schema` (`chainIdSchema`, `raritySchema`, `nftSchema`)
- Helper functions are prefixed with their type context (`getRarityMaxSupply`, `isParcelValid`)
- Keyword definitions follow `camelCaseTypeName + KeywordName + Keyword` (`parcelIsInLimitsKeyword`)
- Types and schemas are separate exports — importing a type has zero runtime cost

## Usage

### Importing types

Types are zero-cost at runtime. Import them with `import type` or use them in type annotations:

```ts
import type { NFT, Rarity, ChainId } from '@dcl/schemas'

function processNFT(nft: NFT): void {
  // ...
}
```

### Validating data with schemas

Every type has a corresponding JSON schema exported as a standalone `const`. To validate data at runtime, pair a schema with `generateLazyValidator`:

```ts
import { chainIdSchema, generateLazyValidator } from '@dcl/schemas'

const validateChainId = generateLazyValidator(chainIdSchema)

if (validateChainId(input)) {
  // input is now typed as ChainId
} else {
  console.error('Invalid chain ID', validateChainId.errors)
}
```

For types that use custom AJV keywords (like `Parcel`, `Wearable`, `Emote`, or `Mappings`), pass the keyword definitions as the second argument:

```ts
import {
  parcelSchema,
  parcelKeywordDefinitions,
  generateLazyValidator
} from '@dcl/schemas'

const validateParcel = generateLazyValidator(parcelSchema, parcelKeywordDefinitions)

if (validateParcel({ x: 10, y: 20 })) {
  // valid parcel
}
```

The validator is lazy — AJV is only instantiated on the first call. This means importing a schema has no runtime cost until validation actually runs.

### Using enum values and helpers

Enums and helper functions are value exports that can be imported directly:

```ts
import {
  Rarity,
  getRarityMaxSupply,
  getRarityColor,
  Network,
  EventType,
  EventSubTypeBlockchain
} from '@dcl/schemas'

const maxSupply = getRarityMaxSupply(Rarity.MYTHIC)
const color = getRarityColor(Rarity.LEGENDARY)
```

## Collaborator's Guide

### Adding a new type

Each type is defined as a plain `export type` (or `export enum`) with its schema as a separate `export const`. This keeps types tree-shakeable: consumers that only need the type pay zero runtime cost, while consumers that need validation import the schema explicitly.

#### Simple type with schema

```ts
import type { JSONSchema } from '../../validation/types.js'

// 1. Define the type
export type MyType = {
  value: number
}

// 2. Define the schema as a separate export
//    Name: camelCase(TypeName) + "Schema"
export const myTypeSchema: JSONSchema<MyType> = {
  type: 'object',
  properties: {
    value: { type: 'number' }
  },
  additionalProperties: false,
  required: ['value']
}
```

#### Enum with schema

```ts
import type { JSONSchema } from '../../validation/types.js'

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

export const statusSchema: JSONSchema<Status> = {
  type: 'string',
  enum: Object.values(Status)
}
```

#### Type with custom validation keywords

When JSON Schema alone is not enough, use custom AJV keyword definitions:

```ts
import type { JSONSchema, KeywordDefinition } from '../../validation/types.js'

export type MyType = {
  start: number
  end: number
}

// Custom keyword that validates start <= end
export const myTypeStartBeforeEndKeyword: KeywordDefinition = {
  keyword: '_startBeforeEnd',
  validate: function (schema: boolean, data: MyType) {
    return data.start <= data.end
  },
  errors: false
}

export const myTypeKeywordDefinitions: KeywordDefinition[] = [myTypeStartBeforeEndKeyword]

export const myTypeSchema: JSONSchema<MyType> = {
  type: 'object',
  properties: {
    start: { type: 'number' },
    end: { type: 'number' }
  },
  required: ['start', 'end'],
  additionalProperties: false,
  _startBeforeEnd: true
}
```

Consumers validate with:

```ts
const validate = generateLazyValidator(myTypeSchema, myTypeKeywordDefinitions)
```

#### Referencing other schemas

When your schema references another type's schema, import it directly:

```ts
import { networkSchema } from './network.js'
import { chainIdSchema } from './chain-id.js'

export const myTypeSchema: JSONSchema<MyType> = {
  type: 'object',
  properties: {
    network: networkSchema,
    chainId: chainIdSchema
  },
  required: ['network', 'chainId']
}
```

#### Barrel file exports

After creating your type, add it to the relevant `index.ts` barrel file. Use `export type` for type aliases and `export` for values (enums, schemas, functions):

```ts
// For a type alias:
export type { MyType } from './my-type.js'
export { myTypeSchema } from './my-type.js'

// For an enum:
export { Status, statusSchema } from './status.js'
```

### Naming conventions

| Export kind | Naming pattern | Example |
|---|---|---|
| Type / interface | PascalCase | `NFT`, `Rarity`, `ChainId` |
| Schema | camelCase(TypeName) + `Schema` | `nftSchema`, `raritySchema` |
| Helper function | `get/is` + TypeContext + Action | `getRarityMaxSupply`, `isParcelValid` |
| Keyword definition | camelCase(TypeName) + KeywordName + `Keyword` | `parcelIsInLimitsKeyword` |
| Keyword definitions array | camelCase(TypeName) + `KeywordDefinitions` | `parcelKeywordDefinitions` |

### Code ownership

Please add types and schemas of your domain into the `src/<team>` folder, also add your team to the [CODEOWNERS](.github/CODEOWNERS) repository to make sure nobody accidentally changes it without your team noticing it.

### Informing changes

Please notify about changes to the schemas to relevant teams by adding the whole team (i.e. `@decentraland/dapps`) as reviewers of the pull requests.

It is recommended to subscribe to this repository (using the `Watch` function) if you use any internal part of the Decentraland ecosystem.

### API report

To make sure the relevant persons and groups are aware of changes in these types, there's an api-extraction process executed with https://api-extractor.com that creates [a report file](report/schemas.api.md) for review between commits. It gets included as part of PRs for easier read.

To generate the file before submitting a PR, run `npm run refresh-api`. This is executed by the CI by running `npm run check-api`. It also verifies that the generated file matches the exported types.

## Versioning and Publishing

Versions are handled manually using Github releases and semver.

Main branch is automatically published to the `@next` dist tag to test integrations before final releases happen.
