import { generateValidator, JSONSchema, ValidateFunction } from "../../validation";

/** @alpha */
export type SpawnPoint = {
  name?: string;
  position: {
    x: number | number[];
    y: number | number[];
    z: number | number[];
  };
  default?: boolean;
  cameraTarget?: {
    x: number;
    y: number;
    z: number;
  };
};

/** @alpha */
export namespace SpawnPoint {
  export const schema: JSONSchema<SpawnPoint> = {
    type: "object",
    properties: {
      name: {
        type: "string",
        nullable: true,
      },
      position: {
        type: "object",
        properties: {
          x: { $ref: "#position" },
          y: { $ref: "#position" },
          z: { $ref: "#position" },
        },
        additionalProperties: false,
        required: ['x', 'y', 'z']
      },
      default: {
        type: "boolean",
        nullable: true
      },
      cameraTarget: {
        type: 'object',
        properties: {
          x: { type: "number" },
          y: { type: "number" },
          z: { type: "number" },
        },
        additionalProperties: false,
        required: ['x', 'y', 'z'],
        nullable: true
      }
    },
    definitions: {
      // @ts-ignore
      position: {
        $id: "#position",
        oneOf: [
          { type: 'number' },
          {
            type: 'array',
            items: {
              type: 'number',
            },
            minItems: 1
          }
        ]
      },
    },
    additionalProperties: false,
    required: ["position"],
  }

  export const validate: ValidateFunction<SpawnPoint> = generateValidator(schema);
}
