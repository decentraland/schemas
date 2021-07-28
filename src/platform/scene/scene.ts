/** @alpha */
export type Scene = {
  main: string
  scene: {
    base: string
    parcels: string[]
  }
  display?: {
    title?: string
    favicon?: string
    description?: string
    navmapThumbnail?: string
  }
  owner?: string
  contact?: {
    name?: string
    email?: string
    im?: string
    url?: string
  }
  tags?: string[]
  source?: {
    origin?: string
    projectId?: string
  }
  spawnPoints?: {
    name?: string
    position: {
      x: number | number[]
      y: number | number[]
      z: number | number[]
    }
    default?: boolean
    cameraTarget?: {
      x: number
      y: number
      z: number
    }
  }[]
  requiredPermissions?: string[]
  featureToggles?: { [key: string]: 'enabled' | 'disabled' }
}


