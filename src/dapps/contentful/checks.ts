import { SysLink } from './client'

export const isSysLink = (link: any): link is SysLink<any> => {
  return link !== null && typeof link === 'object' && 'sys' in link && 'id' in link.sys
}
