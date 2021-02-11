# common-schemas

```
npm i @dcl/shemas
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