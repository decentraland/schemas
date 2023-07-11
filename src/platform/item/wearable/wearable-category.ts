import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum WearableCategory {
  EYEBROWS = 'eyebrows',
  EYES = 'eyes',
  FACIAL_HAIR = 'facial_hair',
  HAIR = 'hair',
  BODY_SHAPE = 'body_shape',
  MOUTH = 'mouth',
  UPPER_BODY = 'upper_body',
  LOWER_BODY = 'lower_body',
  FEET = 'feet',
  EARRING = 'earring',
  EYEWEAR = 'eyewear',
  HAT = 'hat',
  HELMET = 'helmet',
  MASK = 'mask',
  TIARA = 'tiara',
  TOP_HEAD = 'top_head',
  SKIN = 'skin',
  HANDS_WEAR = 'hands_wear'
}

export namespace WearableCategory {
  export const schema: JSONSchema<WearableCategory> = {
    type: 'string',
    enum: Object.values(WearableCategory)
  }

  export const validate: ValidateFunction<WearableCategory> = generateLazyValidator(schema)
}
