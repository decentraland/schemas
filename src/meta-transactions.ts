import { generateValidator, Schema } from "./validation"

export type MetaTransaction = {
  from: string
  params: [string, string] // manaAddress, txData
}

export namespace MetaTransaction {
  export const schema: Schema<MetaTransaction> = {
    type: "object",
    properties: {
      from: { type: "string" },
      params: {
        type: "array",
        items: [{ type: "string" }, { type: "string" }],
        additionalItems: false,
        minItems: 2,
      },
    },
    additionalProperties: false,
    required: ["from", "params"],
  }

  export const validate = generateValidator<MetaTransaction>(schema)
}
