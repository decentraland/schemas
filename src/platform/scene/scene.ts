import { generateValidator, JSONSchema, ValidateFunction } from "../../validation";
import { FeatureToggles } from "./feature-toggles";
import { SceneParcels } from "./scene-parcels";
import { Source } from "./source";
import { SpawnPoint } from "./spawn-point";

/** @alpha */
export type Scene = {
  main: string;
  scene: SceneParcels;
  display?: {
    title?: string;
    favicon?: string;
    description?: string;
    navmapThumbnail?: string;
  };
  owner?: string;
  contact?: {
    name?: string;
    email?: string;
    im?: string;
    url?: string;
  };
  tags?: string[];
  source?: Source;
  spawnPoints?: SpawnPoint[];
  requiredPermissions?: string[];
  featureToggles?: FeatureToggles
};

/** @alpha */
export namespace Scene {
  export const schema: JSONSchema<Scene> = {
    type: "object",
    properties: {
      main: {
        type: "string",
        minLength: 1
      },
      scene: SceneParcels.schema,
      display: {
        type: 'object',
        properties: {
          title: { type: 'string', nullable: true },
          favicon: { type: 'string', nullable: true },
          description: { type: 'string', nullable: true },
          navmapThumbnail: { type: 'string', nullable: true }
        },
        nullable: true,
        additionalProperties: false,
        required: []
      },
      owner: {
        type: "string",
        nullable: true,
      },
      contact: {
        type: 'object',
        properties: {
          name: { type: 'string', nullable: true },
          email: { type: 'string', nullable: true },
          im: { type: 'string', nullable: true },
          url: { type: 'string', nullable: true }
        },
        nullable: true,
        additionalProperties: false,
        required: []
      },
      tags: {
        type: "array",
        items: {
          type: 'string',
          minLength: 1
        },
        nullable: true
      },
      source: {
        ...Source.schema,
        nullable: true
      },
      spawnPoints: {
        type: 'array',
        items: SpawnPoint.schema,
        nullable: true
      },
      requiredPermissions: {
        type: 'array',
        items: {
          type: 'string'
        },
        nullable: true
      },
      featureToggles: {
        ...FeatureToggles.schema,
        nullable: true
      }
    },
    additionalProperties: false,
    required: ["main", "scene"],
  };

  export const validate: ValidateFunction<Scene> = generateValidator(schema);
}
