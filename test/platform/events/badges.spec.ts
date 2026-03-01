import { expect } from 'expect'
import { BadgeGrantedEvent, EventType, EventSubTypeBadge, badgeGrantedEventSchema } from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateBadgeGrantedEvent = generateLazyValidator(badgeGrantedEventSchema)

describe('Badge Events tests', () => {
  it('BadgeGrantedEvent static tests must pass', () => {
    const event: BadgeGrantedEvent = {
      type: EventType.BADGE,
      subType: EventSubTypeBadge.GRANTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        address: '0x',
        badgeId: 'a-badge-id',
        badgeImageUrl: 'https://an-url.tld',
        badgeName: 'Badge Name'
      }
    }

    expect(validateBadgeGrantedEvent(event)).toEqual(true)
    expect(validateBadgeGrantedEvent(null)).toEqual(false)
    expect(validateBadgeGrantedEvent({})).toEqual(false)
  })

  it('BadgeGrantedEvent with tier badge id static tests must pass', () => {
    const event: BadgeGrantedEvent = {
      type: EventType.BADGE,
      subType: EventSubTypeBadge.GRANTED,
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

    expect(validateBadgeGrantedEvent(event)).toEqual(true)
    expect(validateBadgeGrantedEvent(null)).toEqual(false)
    expect(validateBadgeGrantedEvent({})).toEqual(false)
  })
})
