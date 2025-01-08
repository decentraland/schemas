import expect from 'expect'
import { BadgeGrantedEvent, Events } from '../../../src'

describe('Badge Events tests', () => {
  it('BadgeGrantedEvent static tests must pass', () => {
    const event: BadgeGrantedEvent = {
      type: Events.Type.BADGE,
      subType: Events.SubType.Badge.GRANTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: '0x',
        badgeId: 'a-badge-id',
        badgeImageUrl: 'https://an-url.tld',
        badgeName: 'Badge Name'
      }
    }

    expect(BadgeGrantedEvent.validate(event)).toEqual(true)
    expect(BadgeGrantedEvent.validate(null)).toEqual(false)
    expect(BadgeGrantedEvent.validate({})).toEqual(false)
  })

  it('BadgeGrantedEvent with tier badge id static tests must pass', () => {
    const event: BadgeGrantedEvent = {
      type: Events.Type.BADGE,
      subType: Events.SubType.Badge.GRANTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: '0x',
        badgeId: 'a-badge-id',
        badgeImageUrl: 'https://an-url.tld',
        badgeName: 'Badge Name',
        badgeTierName: 'tier-name'
      }
    }

    expect(BadgeGrantedEvent.validate(event)).toEqual(true)
    expect(BadgeGrantedEvent.validate(null)).toEqual(false)
    expect(BadgeGrantedEvent.validate({})).toEqual(false)
  })
})
