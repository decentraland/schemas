import expect from 'expect'
import { AssetBundleConversionFinishedEvent, Events } from '../../../src'

describe('AssetBundleConversionFinished Events tests', () => {
  it('AssetBundleConversionFinishedEvent static tests must pass', () => {
    const event: AssetBundleConversionFinishedEvent = {
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

    expect(AssetBundleConversionFinishedEvent.validate(event)).toEqual(true)
    expect(AssetBundleConversionFinishedEvent.validate(null)).toEqual(false)
    expect(AssetBundleConversionFinishedEvent.validate({})).toEqual(false)
  })
})
