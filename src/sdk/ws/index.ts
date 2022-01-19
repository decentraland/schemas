import { SCENE_UPDATE, SceneUpdate } from './scene-update'
import { UPDATE, Update } from './update'

export * from './scene-update'
export * from './update'

/** @public */
export type Actions = typeof SCENE_UPDATE | typeof UPDATE

/** @public */
export type Messages = SceneUpdate | Update
