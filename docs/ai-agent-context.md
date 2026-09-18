# AI Agent Context

**Service Purpose:** Central TypeScript library defining data structures, types, and validators for the Decentraland ecosystem. Provides type safety and runtime validation across all Decentraland projects, ensuring consistency and preventing type-related errors.

**Key Capabilities:**

- Defines entity types (Scene, Profile, Wearable, Emote, Pet, etc.)
- Provides JSON schema definitions and AJV-based validators for all types
- Exports TypeScript types that also act as values (via namespaces)
- Generates API extraction reports for type change tracking
- Maintains platform schemas (entities, profiles, items, outfits)
- Provides event type definitions for event-driven architecture

**Communication Pattern:** Library/package consumed by other projects (synchronous function calls)

**Technology Stack:**

- Runtime: Node.js (compiled to JavaScript/TypeScript)
- Language: TypeScript
- Validation: AJV (JSON schema validation)
- Documentation: API Extractor for type documentation

**External Dependencies:**

- None (this is a foundational library with no runtime dependencies)

**Key Concepts:**

- **Namespace Pattern**: Every type is also a namespace with `schema` and `validate` properties
- **Cost-free Imports**: Types can be used as both TypeScript types and JavaScript values
- **Validation**: Runtime validation using AJV for type safety
- **API Extraction**: Automated documentation generation for type changes

**Project Structure:**

- `src/platform/`: Core Decentraland platform types (entities, profiles, items)
- `src/dapps/`: Types for dApp integrations
- `report/`: Generated API documentation for type review

**Usage Pattern:**

```typescript
// As type
const profile: Profile = { avatars: [...] }

// As validator
Profile.validate(profile) // returns ValidationResult
```
