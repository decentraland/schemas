import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../validation'
import { BaseEvent, Events } from './base'
import { createEventSchema } from './utils'

export type GovernanceProposalEnactedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.PROPOSAL_ENACTED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceCoauthorRequestedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.COAUTHOR_REQUESTED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernancePitchPassedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.PITCH_PASSED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceTenderPassedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.TENDER_PASSED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceAuthoredProposalFinishedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.AUTHORED_PROPOSAL_FINISHED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceVotingEndedVoterEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.VOTING_ENDED_VOTER
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceNewCommentOnProposalEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.NEW_COMMENT_ON_PROPOSAL
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceNewCommentOnProjectUpdatedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.NEW_COMMENT_ON_PROJECT_UPDATED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceWhaleVoteEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.WHALE_VOTE
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceVotedOnBehalfEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.VOTED_ON_BEHALF
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

export type GovernanceCliffEndedEvent = BaseEvent & {
  type: Events.Type.GOVERNANCE
  subType: Events.SubType.Governance.CLIFF_ENDED
  metadata: {
    proposalId: string
    proposalTitle: string
    title: string
    description: string
    link: string
    address: string
  }
}

const governanceMetadataSchema: JSONSchema<GovernanceProposalEnactedEvent['metadata']> = {
  type: 'object',
  properties: {
    proposalId: { type: 'string' },
    proposalTitle: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    link: { type: 'string' },
    address: { type: 'string' }
  },
  required: ['proposalId', 'proposalTitle', 'title', 'description', 'link', 'address'],
  additionalProperties: false
}

export namespace GovernanceProposalEnactedEvent {
  export const schema: JSONSchema<GovernanceProposalEnactedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.PROPOSAL_ENACTED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceProposalEnactedEvent> = generateLazyValidator(schema)
}

export namespace GovernanceCoauthorRequestedEvent {
  export const schema: JSONSchema<GovernanceCoauthorRequestedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.COAUTHOR_REQUESTED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceCoauthorRequestedEvent> = generateLazyValidator(schema)
}

export namespace GovernancePitchPassedEvent {
  export const schema: JSONSchema<GovernancePitchPassedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.PITCH_PASSED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernancePitchPassedEvent> = generateLazyValidator(schema)
}

export namespace GovernanceTenderPassedEvent {
  export const schema: JSONSchema<GovernanceTenderPassedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.TENDER_PASSED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceTenderPassedEvent> = generateLazyValidator(schema)
}

export namespace GovernanceAuthoredProposalFinishedEvent {
  export const schema: JSONSchema<GovernanceAuthoredProposalFinishedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.AUTHORED_PROPOSAL_FINISHED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceAuthoredProposalFinishedEvent> = generateLazyValidator(schema)
}

export namespace GovernanceVotingEndedVoterEvent {
  export const schema: JSONSchema<GovernanceVotingEndedVoterEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.VOTING_ENDED_VOTER,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceVotingEndedVoterEvent> = generateLazyValidator(schema)
}

export namespace GovernanceNewCommentOnProposalEvent {
  export const schema: JSONSchema<GovernanceNewCommentOnProposalEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.NEW_COMMENT_ON_PROPOSAL,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceNewCommentOnProposalEvent> = generateLazyValidator(schema)
}

export namespace GovernanceNewCommentOnProjectUpdatedEvent {
  export const schema: JSONSchema<GovernanceNewCommentOnProjectUpdatedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.NEW_COMMENT_ON_PROJECT_UPDATED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceNewCommentOnProjectUpdatedEvent> = generateLazyValidator(schema)
}

export namespace GovernanceWhaleVoteEvent {
  export const schema: JSONSchema<GovernanceWhaleVoteEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.WHALE_VOTE,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceWhaleVoteEvent> = generateLazyValidator(schema)
}

export namespace GovernanceVotedOnBehalfEvent {
  export const schema: JSONSchema<GovernanceVotedOnBehalfEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.VOTED_ON_BEHALF,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceVotedOnBehalfEvent> = generateLazyValidator(schema)
}

export namespace GovernanceCliffEndedEvent {
  export const schema: JSONSchema<GovernanceCliffEndedEvent> = createEventSchema(
    Events.Type.GOVERNANCE,
    Events.SubType.Governance.CLIFF_ENDED,
    governanceMetadataSchema
  )
  export const validate: ValidateFunction<GovernanceCliffEndedEvent> = generateLazyValidator(schema)
}
