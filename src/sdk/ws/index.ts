import { SCENE_UPDATE, SceneUpdate } from './scene-update.js'
import { UPDATE, Update } from './update.js'

export * from './scene-update.js'
export * from './update.js'

/** @public */
export type Actions = typeof SCENE_UPDATE | typeof UPDATE

/** @public */
export type Messages = SceneUpdate | Update
