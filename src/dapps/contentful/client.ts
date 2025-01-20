// Contentful simplified client types

enum ContentfulLocale {
  enUS = 'en-US',
  es = 'es',
  zh = 'zh'
}

type LocalizedField<T> = {
  [ContentfulLocale.enUS]: T
  [ContentfulLocale.es]?: T
  [ContentfulLocale.zh]?: T
}

type FileType = {
  url: string
  details: {
    size: number
    image?: {
      width: number
      height: number
    }
  }
  fileName: string
  contentType: string
}
type AlignmentFieldType = 'Left' | 'Center' | 'Right'
type SysLink<T extends 'Entry' | 'Asset' | 'Environment' | 'ContentType' | 'Space'> = {
  sys: {
    type: 'Link'
    linkType: T
    id: string
  }
}
// Use any here to avoid importing Contentful's types
type LocalizedFieldType = any

type LocalizedFields = Record<string, LocalizedField<LocalizedFieldType>>

type ContentfulAsset = ContentfulContent<'Asset', AssetFields>
type ContentfulEntry<T extends LocalizedFields> = ContentfulContent<'Entry', T>

type ContentfulContent<X extends 'Asset' | 'Entry', T extends LocalizedFields> = {
  metadata: {
    tags: string[]
    concepts: string[]
  }
  sys: {
    space: SysLink<'Space'>
    id: string
    type: X
    createdAt: string
    updatedAt: string
    environment: SysLink<'Environment'>
    publishedVersion: number
    revision: number
    // eslint-disable-next-line @typescript-eslint/ban-types
  } & (X extends 'Entry' ? { contentType: SysLink<'ContentType'> } : {})
  fields: T
}

type AssetFields = {
  title: LocalizedField<string>
  description: LocalizedField<string>
  file: LocalizedField<FileType>
}

type ContentfulResponse<T extends LocalizedFields> = {
  items: Array<ContentfulEntry<T>>
  includes: {
    Asset?: ContentfulAsset[]
    Entry?: ContentfulEntry<LocalizedFields>[]
  }
}

export {
  AlignmentFieldType,
  FileType,
  LocalizedFields,
  ContentfulEntry,
  ContentfulAsset,
  ContentfulLocale,
  LocalizedField,
  SysLink,
  LocalizedFieldType,
  ContentfulResponse
}
