import expect from "expect"
import { MetaTransaction } from "../src"

describe("MetaTransaction tests", () => {
  it("static tests must pass", () => {
    const metaTx: MetaTransaction = {
      from: "0x1",
      params: ["0x2", "0x3"],
    }

    expect(MetaTransaction.validate(metaTx)).toEqual(true)
  })
  it("schema must be object", () => {
    expect(typeof MetaTransaction.schema).toEqual("object")
  })
})
