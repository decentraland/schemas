import expect from 'expect'
import { ItemType } from '../src'
import { testTypeSignature } from './test-utils'

describe('ItemType tests', () => {
  const itemType: ItemType = ItemType.WEARABLE

  testTypeSignature(ItemType, itemType)

  it('static tests must pass', () => {
    expect(ItemType.validate(itemType)).toEqual(true)
    expect(ItemType.validate(null)).toEqual(false)
    expect(ItemType.validate({})).toEqual(false)
  })
})
