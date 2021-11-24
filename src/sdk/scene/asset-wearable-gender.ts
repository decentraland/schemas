import { WearableGender } from "../../dapps/wearable-gender";
import {
  generateValidator,
  JSONSchema,
  ValidateFunction,
} from "../../validation";

enum AssetWearableBothGender {
  BOTH = "both",
}

export type AssetWearableGender = AssetWearableBothGender | WearableGender;

export namespace AssetWearableGender {
  export const schema: JSONSchema<AssetWearableGender> = {
    type: "string",
    enum: Object.values(AssetWearableGender),
  };

  export const validate: ValidateFunction<AssetWearableGender> =
    generateValidator(schema);
}
