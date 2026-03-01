import type { JSONSchema } from '../../validation/types.js'
import { BaseEvent, EventType, EventSubTypeGovernance } from './base.js'
import { createEventSchema } from './utils.js'

export type GovernanceProposalEnactedEvent = BaseEvent & {
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.PROPOSAL_ENACTED
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.COAUTHOR_REQUESTED
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.PITCH_PASSED
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.TENDER_PASSED
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.AUTHORED_PROPOSAL_FINISHED
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.VOTING_ENDED_VOTER
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.NEW_COMMENT_ON_PROPOSAL
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.NEW_COMMENT_ON_PROJECT_UPDATED
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.WHALE_VOTE
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.VOTED_ON_BEHALF
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
  type: EventType.GOVERNANCE
  subType: EventSubTypeGovernance.CLIFF_ENDED
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

export const governanceProposalEnactedEventSchema: JSONSchema<GovernanceProposalEnactedEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.PROPOSAL_ENACTED,
  governanceMetadataSchema
)

export const governanceCoauthorRequestedEventSchema: JSONSchema<GovernanceCoauthorRequestedEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.COAUTHOR_REQUESTED,
  governanceMetadataSchema
)

export const governancePitchPassedEventSchema: JSONSchema<GovernancePitchPassedEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.PITCH_PASSED,
  governanceMetadataSchema
)

export const governanceTenderPassedEventSchema: JSONSchema<GovernanceTenderPassedEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.TENDER_PASSED,
  governanceMetadataSchema
)

export const governanceAuthoredProposalFinishedEventSchema: JSONSchema<GovernanceAuthoredProposalFinishedEvent> =
  createEventSchema(EventType.GOVERNANCE, EventSubTypeGovernance.AUTHORED_PROPOSAL_FINISHED, governanceMetadataSchema)

export const governanceVotingEndedVoterEventSchema: JSONSchema<GovernanceVotingEndedVoterEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.VOTING_ENDED_VOTER,
  governanceMetadataSchema
)

export const governanceNewCommentOnProposalEventSchema: JSONSchema<GovernanceNewCommentOnProposalEvent> =
  createEventSchema(EventType.GOVERNANCE, EventSubTypeGovernance.NEW_COMMENT_ON_PROPOSAL, governanceMetadataSchema)

export const governanceNewCommentOnProjectUpdatedEventSchema: JSONSchema<GovernanceNewCommentOnProjectUpdatedEvent> =
  createEventSchema(
    EventType.GOVERNANCE,
    EventSubTypeGovernance.NEW_COMMENT_ON_PROJECT_UPDATED,
    governanceMetadataSchema
  )

export const governanceWhaleVoteEventSchema: JSONSchema<GovernanceWhaleVoteEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.WHALE_VOTE,
  governanceMetadataSchema
)

export const governanceVotedOnBehalfEventSchema: JSONSchema<GovernanceVotedOnBehalfEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.VOTED_ON_BEHALF,
  governanceMetadataSchema
)

export const governanceCliffEndedEventSchema: JSONSchema<GovernanceCliffEndedEvent> = createEventSchema(
  EventType.GOVERNANCE,
  EventSubTypeGovernance.CLIFF_ENDED,
  governanceMetadataSchema
)
