import expect from 'expect'
import { AssetBundleConvertedEvent, Events } from '../../../src'

describe('AssetBundleConverted Events tests', () => {
  it('AssetBundleConvertedEvent static tests must pass', () => {
    const event: AssetBundleConvertedEvent = {
      type: Events.Type.ASSET_BUNDLE,
      subType: Events.SubType.AssetBundle.CONVERTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        entityId: 'baf',
        platform: 'mac',
        statusCode: 1,
        isLods: false
      }
    }

    expect(AssetBundleConvertedEvent.validate(event)).toEqual(true)
    expect(AssetBundleConvertedEvent.validate(null)).toEqual(false)
    expect(AssetBundleConvertedEvent.validate({})).toEqual(false)
  })
})
