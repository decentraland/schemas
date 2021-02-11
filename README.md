# common-schemas

```
npm i @dcl/schemas
```

### Design considerations

- The main entrypoint of the library export namespaces only
- Every namespace is a domain `MetaTransactions`
- Type names are PascalCase
- Validators and schemas are camelCase


## Generating types, validators and schemas

We will export types that act as values. We do that using the "namespaces" of typescript.

```ts
// Declare type
export type MyType = {
  value: number
}
// Declare namespace
export namespace MyType {
  export const schema: Schema<MyType> = {
    type: "object",
    properties: {
      value: { type: number }
    },
    additionalProperties: false,
    required: ["value"]
  }

  export const validate = generateValidator<MyType>(schema)
}
```

In that sense, MyType can be both used as type `const a: MyType` and as object `MyType.validate(a)`.

## Type ownership

Please add types and schemas of your domain into the `src/<team>` folder, also add your team to the [CODEOWNERS](.github/CODEOWNERS) repository to make sure nobody accidentally changes it without your team noticing it.

## Informing changes

Please notify about changes to the schemas to the teams by adding the whole team (i.e. @decentraland/dapps) as reviewers of the pull requests.

## Making changes

To make sure everybody is aware of changes in types, we have a process of api-extraction using https://api-extractor.com. It creates [a report file](report/schemas.api.md) that should be reviewed upon every change and commited as part of the PR.

To generate the file with your changes run `npm run build && npm run refresh-api`.

In the CI, `npm run check-api` is executed to verify the generated file matches the exported types.