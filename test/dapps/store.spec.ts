import expect from 'expect'
import { Store } from '../../src'
import { testTypeSignature } from '../test-utils'

describe('Contract tests', () => {
  const store: Store = {
    id: 'urn:decentraland:marketplace:store:0xe592427a0aece92de3edee1f18e0157c05861564',
    description: 'Some store',
    owner: '0xe592427a0aece92de3edee1f18e0157c05861564',
    links: [
      {
        name: 'Discord',
        url: 'discord.com/some-store'
      }
    ],
    images: [
      {
        name: 'banner',
        file: 'banner.png'
      }
    ],
    version: 1
  }

  testTypeSignature(Store, store)

  it('static tests must pass', () => {
    expect(Store.validate(store)).toEqual(true)
    expect(Store.validate(null)).toEqual(false)
    expect(Store.validate({})).toEqual(false)
  })
})
