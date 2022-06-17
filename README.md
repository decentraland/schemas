# common-schemas

Decentraland data structure interfaces and validators for TypeScript-based projects.

Install it with:
```bash
npm i @dcl/schemas
```

## Design Guidelines

- Prevent type problems across projects
- Fail as early as possible, aim for compile-time
- Preserve user optionality through runtime helpers
- Prefer no-cost implementations and allow no-dependency import
- Code is written once, read hundreds of times

Implementation decisions:

- The main entrypoint should only export types
- Every type is also a namespace
- Type names are PascalCase
- Validators and schemas are camelCase

### Collaborator's Guide

#### Generating types, validators and schemas

This library export types that also act as values. This is achieved through TypeScript's [`namespaces`](https://www.typescriptlang.org/docs/handbook/namespaces.html). This means that every type imported from this library can also be used as a JS object. These types will include two properties named `schema` and `validate`. `namespaces` in typescript can be considered "`cost` imports".

#### Example Type Definition

```ts
// Declare type
export type MyType = {
  value: number;
};

// Declare namespace for the type
export namespace MyType {
  export const schema: Schema<MyType> = {
    type: "object",
    properties: {
      value: { type: number },
    },
    additionalProperties: false,
    required: ["value"],
  };

  export const validate = generateValidator<MyType>(schema);
}
```

MyType can now be both used as type `const a: MyType` or as an object `MyType.validate(a)`.

Beware that `validate` has type `ValidateFunction<T>` which `ajv` creates automatically. When writing new validations always try to implement it as an ajv validation, even if custom code is needed. See [here](https://ajv.js.org/keywords.html#define-keyword-with-code-generation-function).

Particularly, beware of using the library like this, because reports by the `validator.validate` function are lost and never returned to the caller.

```ts
const validator = generateValidator<MyType>(schema);
export const validate = (mt: MyType) =>
  validator.validate(mt) && otherValidations(mt);
```

#### Code ownership

Please add types and schemas of your domain into the `src/<team>` folder, also add your team to the [CODEOWNERS](.github/CODEOWNERS) repository to make sure nobody accidentally changes it without your team noticing it.

#### Informing changes

Please notify about changes to the schemas to relevant teams by adding the whole team (i.e. `@decentraland/dapps`) as reviewers of the pull requests.

It is recommended to subscribe to this repository (using the `Watch` function) if you use any internal part of the Decentraland ecosystem.

#### Making changes

To make sure the relevant persons and groups are aware of changes in these types, there's an api-extraction process executed with https://api-extractor.com that creates [a report file](report/schemas.api.md) for review between commits. It gets included as part of PRs for easier read.

To generate the file before submitting a PR, run `npm run refresh-api`. This is executed by the CI by runnig `npm run check-api`. It also verifies that the generated file matches the exported types.

## Versioning and Publishing

Versions are handled manually using Github releases and semver.

Main branch is automatically published to the `@next` dist tag to test integrations before final releases happen.
