import { RepresentationDefinition } from './representation-definition'

/** @alpha */
export type RepresentationWithBlobs = Omit<
  RepresentationDefinition,
  'contents'
> & { contents: { key: string; blob: Blob }[] }
