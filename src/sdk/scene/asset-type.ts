import { generateValidator, JSONSchema, ValidateFunction } from "../../validation";

export enum AssetType {
  PORTABLE_EXPERIENCE = "portable-experience",
  WEARABLE = "wearable",
  SMART_ITEM = "smart-item"
}

export namespace AssetType {
  export const schema: JSONSchema<AssetType> = {
    type: "string",
    enum: Object.values(AssetType),
  };

  export const validate: ValidateFunction<AssetType> =
    generateValidator(schema);
}
