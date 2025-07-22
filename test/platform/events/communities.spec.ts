import expect from 'expect'
import {
  CommunityDeletedEvent,
  CommunityRenamedEvent,
  CommunityMemberBannedEvent,
  CommunityMemberRemovedEvent,
  Events
} from '../../../src'

describe('Community Events tests', () => {
  it('CommunityDeletedEvent static tests must pass', () => {
    const event: CommunityDeletedEvent = {
      type: Events.Type.COMMUNITY,
      subType: Events.SubType.Community.DELETED,
      key: 'key',
      timestamp: 1,
      metadata: {
        id: 'community-123',
        name: 'Test Community'
      }
    }

    expect(CommunityDeletedEvent.validate(event)).toEqual(true)
    expect(CommunityDeletedEvent.validate(null)).toEqual(false)
    expect(CommunityDeletedEvent.validate({})).toEqual(false)
  })

  it('CommunityRenamedEvent static tests must pass', () => {
    const event: CommunityRenamedEvent = {
      type: Events.Type.COMMUNITY,
      subType: Events.SubType.Community.RENAMED,
      key: 'key',
      timestamp: 1,
      metadata: {
        id: 'community-123',
        oldName: 'Old Community Name',
        newName: 'New Community Name'
      }
    }

    expect(CommunityRenamedEvent.validate(event)).toEqual(true)
    expect(CommunityRenamedEvent.validate(null)).toEqual(false)
    expect(CommunityRenamedEvent.validate({})).toEqual(false)
  })

  it('CommunityMemberBannedEvent static tests must pass', () => {
    const event: CommunityMemberBannedEvent = {
      type: Events.Type.COMMUNITY,
      subType: Events.SubType.Community.MEMBER_BANNED,
      key: 'key',
      timestamp: 1,
      metadata: {
        id: 'community-123',
        name: 'Test Community',
        memberAddress: '0x1234567890123456789012345678901234567890'
      }
    }

    expect(CommunityMemberBannedEvent.validate(event)).toEqual(true)
    expect(CommunityMemberBannedEvent.validate(null)).toEqual(false)
    expect(CommunityMemberBannedEvent.validate({})).toEqual(false)
  })

  it('CommunityMemberRemovedEvent static tests must pass', () => {
    const event: CommunityMemberRemovedEvent = {
      type: Events.Type.COMMUNITY,
      subType: Events.SubType.Community.MEMBER_REMOVED,
      key: 'key',
      timestamp: 1,
      metadata: {
        id: 'community-123',
        name: 'Test Community',
        memberAddress: '0x1234567890123456789012345678901234567890'
      }
    }

    expect(CommunityMemberRemovedEvent.validate(event)).toEqual(true)
    expect(CommunityMemberRemovedEvent.validate(null)).toEqual(false)
    expect(CommunityMemberRemovedEvent.validate({})).toEqual(false)
  })
})
