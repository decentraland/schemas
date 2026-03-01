import { expect } from 'expect'
import {
  AssetBundleConversionFinishedEvent,
  AssetBundleConversionManuallyQueuedEvent,
  EventType,
  EventSubTypeAssetBundle,
  assetBundleConversionFinishedEventSchema,
  assetBundleConversionManuallyQueuedEventSchema
} from '../../../src'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validateAssetBundleConversionFinishedEvent = generateLazyValidator(assetBundleConversionFinishedEventSchema)
const validateAssetBundleConversionManuallyQueuedEvent = generateLazyValidator(
  assetBundleConversionManuallyQueuedEventSchema
)

describe('AssetBundleConversionFinished Events tests', () => {
  it('AssetBundleConversionFinishedEvent static tests must pass', () => {
    const event: AssetBundleConversionFinishedEvent = {
      type: EventType.ASSET_BUNDLE,
      subType: EventSubTypeAssetBundle.CONVERTED,
      key: 'key',
      timestamp: 1,
      metadata: {
        entityId: 'baf',
        platform: 'mac',
        statusCode: 1,
        isLods: false,
        isWorld: false,
        version: '1'
      }
    }

    expect(validateAssetBundleConversionFinishedEvent(event)).toEqual(true)
    expect(validateAssetBundleConversionFinishedEvent(null)).toEqual(false)
    expect(validateAssetBundleConversionFinishedEvent({})).toEqual(false)
  })
})

describe('AssetBundleConversionManuallyQueued Events tests', () => {
  it('AssetBundleConversionManuallyQueuedEvent static tests must pass', () => {
    const event: AssetBundleConversionManuallyQueuedEvent = {
      type: EventType.ASSET_BUNDLE,
      subType: EventSubTypeAssetBundle.MANUALLY_QUEUED,
      key: 'key',
      timestamp: 1,
      metadata: {
        entityId: 'baf',
        platform: 'mac',
        isLods: false,
        isPriority: false,
        version: '1'
      }
    }

    expect(validateAssetBundleConversionManuallyQueuedEvent(event)).toEqual(true)
    expect(validateAssetBundleConversionManuallyQueuedEvent(null)).toEqual(false)
    expect(validateAssetBundleConversionManuallyQueuedEvent({})).toEqual(false)
  })
})
