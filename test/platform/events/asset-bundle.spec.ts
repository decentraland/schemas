import expect from 'expect'
import { AssetBundleConversionFinishedEvent, AssetBundleConversionManuallyQueuedEvent, Events } from '../../../src'

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
        isLods: false,
        isWorld: false
      }
    }

    expect(AssetBundleConversionFinishedEvent.validate(event)).toEqual(true)
    expect(AssetBundleConversionFinishedEvent.validate(null)).toEqual(false)
    expect(AssetBundleConversionFinishedEvent.validate({})).toEqual(false)
  })
})

describe('AssetBundleConversionManuallyQueued Events tests', () => {
  it('AssetBundleConversionManuallyQueuedEvent static tests must pass', () => {
    const event: AssetBundleConversionManuallyQueuedEvent = {
      type: Events.Type.ASSET_BUNDLE,
      subType: Events.SubType.AssetBundle.MANUALLY_QUEUED,
      key: 'key',
      timestamp: 1,
      metadata: {
        entityId: 'baf',
        platform: 'mac',
        isLods: false,
        isPriority: false
      }
    }

    expect(AssetBundleConversionManuallyQueuedEvent.validate(event)).toEqual(true)
    expect(AssetBundleConversionManuallyQueuedEvent.validate(null)).toEqual(false)
    expect(AssetBundleConversionManuallyQueuedEvent.validate({})).toEqual(false)
  })
})
