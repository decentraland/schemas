import { expect } from 'expect'
import { type Store, storeSchema } from '../../src'
import { testTypeSignature } from '../test-utils'
import { generateLazyValidator } from '../../src/validation/index.js'

const validateStore = generateLazyValidator(storeSchema)

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

  testTypeSignature({ schema: storeSchema }, store)

  it('static tests must pass', () => {
    expect(validateStore(store)).toEqual(true)
    expect(validateStore(null)).toEqual(false)
    expect(validateStore({})).toEqual(false)
  })
})
