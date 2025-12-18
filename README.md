# @dcl/schemas

[![npm version](https://img.shields.io/npm/v/@dcl/schemas.svg)](https://www.npmjs.com/package/@dcl/schemas)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

Decentraland data structure interfaces and validators for TypeScript-based projects. This library provides type-safe schemas with runtime validation using [AJV](https://ajv.js.org/).

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Modules](#modules)
- [Usage Examples](#usage-examples)
- [Design Guidelines](#design-guidelines)
- [Contributing](#contributing)
- [Versioning and Publishing](#versioning-and-publishing)

## Installation

```bash
npm install @dcl/schemas
```

## Quick Start

Every type exported from this library can be used both as a TypeScript type and as a runtime validator:

```ts
import { Network, Rarity, EthAddress } from '@dcl/schemas'

// Use as TypeScript types
const network: Network = Network.ETHEREUM
const rarity: Rarity = Rarity.LEGENDARY

// Use as runtime validators
const address = '0x1234567890abcdef1234567890abcdef12345678'

if (EthAddress.validate(address)) {
  console.log('Valid Ethereum address!')
} else {
  console.log('Invalid address:', EthAddress.validate.errors)
}
```

## Modules

The library is organized into domain-specific modules:

### `dapps`

Schemas for Decentraland marketplace and dApps:

| Schema | Description |
|--------|-------------|
| `Account` | User account data and filters |
| `NFT` | Non-fungible token representation |
| `Item` | Marketplace items |
| `Order` | Buy/sell orders |
| `Bid` | Auction bids |
| `Collection` | NFT collections |
| `Contract` | Smart contract references |
| `Sale` | Completed sales |
| `Rarity` | Item rarity levels (common, rare, legendary, etc.) |
| `Network` | Blockchain networks (Ethereum, Polygon, etc.) |
| `ChainId` | Blockchain chain identifiers |
| `RentalListing` | LAND rental listings |
| `Trade` | Trade data |
| `Store` | Decentraland stores |
| `World` | World boundaries and validation |

### `platform`

Schemas for Decentraland platform entities:

| Schema | Description |
|--------|-------------|
| `Profile` / `Avatar` | User profiles and avatars |
| `Wearable` | Wearable items and categories |
| `Emote` | Avatar emotes and animations |
| `Scene` | Scene metadata and deployment |
| `Entity` | Content entities |
| `Outfits` | Avatar outfit configurations |
| `Notifications` | User notification schemas |
| `Events` | Platform event types |
| `MerkleTree` | Merkle proof structures |

### `core`

Low-level validation utilities:

| Schema | Description |
|--------|-------------|
| `EthAddress` | Ethereum address validation |
| `IPFSv1` / `IPFSv2` | IPFS hash validation |
| `Color3` | RGB color validation |
| Parcel validation | Coordinate validation utilities |
| URL validation | URL format validation |

### `misc`

Miscellaneous schemas:

| Schema | Description |
|--------|-------------|
| `AuthChain` | Authentication chain for signatures |
| `ContentMapping` | Content file mappings |
| `Email` | Email address validation |
| `LinkerAuthorization` | Scene linker authorization |

### `sdk`

SDK-related schemas:

| Schema | Description |
|--------|-------------|
| `Project` | SDK project configuration |
| `WebSocket` | WebSocket message schemas |

## Usage Examples

### Validating Data

```ts
import { NFT, Rarity } from '@dcl/schemas'

// Validate incoming data
function processNFT(data: unknown) {
  if (NFT.validate(data)) {
    // TypeScript knows `data` is of type `NFT` here
    console.log(`Processing NFT: ${data.name}`)
  } else {
    // Access validation errors
    console.error('Invalid NFT data:', NFT.validate.errors)
  }
}

// Use helper functions from namespaces
const maxSupply = Rarity.getMaxSupply(Rarity.LEGENDARY) // 100
const color = Rarity.getColor(Rarity.EPIC) // '#3D85E6'
```

### Type-Safe API Responses

```ts
import { PaginatedResponse, NFT } from '@dcl/schemas'

type NFTResponse = PaginatedResponse<NFT>

async function fetchNFTs(): Promise<NFTResponse> {
  const response = await fetch('/api/nfts')
  const data = await response.json()
  
  // Validate the response
  if (!Array.isArray(data.results) || !data.results.every(NFT.validate)) {
    throw new Error('Invalid API response')
  }
  
  return data as NFTResponse
}
```

### Using Chain Utilities

```ts
import { ChainId, getChainName, Network } from '@dcl/schemas'

const chainId = ChainId.ETHEREUM_MAINNET
const chainName = getChainName(chainId) // 'Ethereum Mainnet'

// Validate chain IDs
if (ChainId.validate(someValue)) {
  console.log('Valid chain ID')
}
```

### Accessing JSON Schemas

Each type exposes its underlying JSON Schema for use with other validation libraries or documentation:

```ts
import { Rarity } from '@dcl/schemas'

console.log(Rarity.schema)
// {
//   type: 'string',
//   enum: ['unique', 'mythic', 'exotic', 'legendary', 'epic', 'rare', 'uncommon', 'common']
// }
```

## Design Guidelines

### Principles

- **Type Safety First**: Prevent type problems across projects by catching errors at compile-time
- **Fail Early**: Validate as early as possible, preferring compile-time over runtime errors
- **User Optionality**: Provide runtime helpers without forcing their use
- **Zero-Cost Abstractions**: Allow no-dependency imports where possible
- **Readability**: Code is written once, read hundreds of times

### Implementation Patterns

- The main entrypoint exports only types (no side effects)
- Every type is also a namespace containing `schema` and `validate`
- Type names use `PascalCase`
- Validators and schemas use `camelCase`

## Contributing

### Adding New Types

1. Create your type in the appropriate `src/<domain>` folder
2. Follow the type + namespace pattern:

```ts
import { generateLazyValidator, JSONSchema, ValidateFunction } from '../validation'

// Declare the type
export type MyType = {
  value: number
  name: string
}

// Declare the namespace with schema and validator
export namespace MyType {
  export const schema: JSONSchema<MyType> = {
    type: 'object',
    properties: {
      value: { type: 'number' },
      name: { type: 'string' }
    },
    additionalProperties: false,
    required: ['value', 'name']
  }

  export const validate: ValidateFunction<MyType> = generateLazyValidator(schema)
}
```

3. Export from the domain's `index.ts`
4. Add your team to [CODEOWNERS](.github/CODEOWNERS)

### Custom Validation

For complex validation logic, use AJV's [custom keywords](https://ajv.js.org/keywords.html#define-keyword-with-code-generation-function):

```ts
export const validate = generateLazyValidator(schema, [
  {
    keyword: 'myCustomRule',
    validate: (schema, data) => /* custom logic */
  }
])
```

> ⚠️ **Important**: Avoid wrapping validators like this, as it loses error information:
> ```ts
> // ❌ Don't do this - errors are lost
> export const validate = (data: MyType) =>
>   validator.validate(data) && otherValidations(data)
> ```

### API Changes

This repo uses [api-extractor](https://api-extractor.com) to track API changes. Before submitting a PR:

```bash
# Generate the API report
npm run refresh-api

# The CI will run this to verify
npm run check-api
```

The [report file](report/schemas.api.md) helps reviewers understand API changes at a glance.

### Code Review

- Notify relevant teams by adding them as PR reviewers (e.g., `@decentraland/dapps`)
- Subscribe to this repository using the **Watch** button to stay informed of changes

## Versioning and Publishing

- Versions are managed manually using GitHub releases and [semver](https://semver.org/)
- The `main` branch is automatically published to the `@next` dist tag for integration testing:

```bash
# Install latest stable
npm install @dcl/schemas

# Install latest from main branch
npm install @dcl/schemas@next
```

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.
