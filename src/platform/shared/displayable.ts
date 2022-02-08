/**
 * @public
 *
 * Describes common properties to display deployments.
 */
export type DisplayableDeployment = {
  /** Name of the file used as icon for the MenuBar */
  menuBarIcon?: string
}

// @internal
export const displayableProperties = {
  menuBarIcon: {
    description: 'Name of the file used as icon for the MenuBar',
    type: 'string',
    nullable: true
  }
} as const
