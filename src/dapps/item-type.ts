import { generateValidator, JSONSchema, ValidateFunction } from '../validation'

export enum ItemType {
  WEARABLE = 'wearable',
  SMART_WEARABLE = 'smart_wearable'
}

export namespace ItemType {
  export const schema: JSONSchema<ItemType> = {
    type: 'string',
    enum: Object.values(ItemType)
  }

  export const validate: ValidateFunction<ItemType> = generateValidator(schema)
}
