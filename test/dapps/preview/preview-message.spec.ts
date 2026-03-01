import { expect } from 'expect'
import sinon from 'sinon'
import { PreviewMessageType, previewMessageTypeSchema, sendMessage } from '../../../src'
import { testTypeSignature } from '../../test-utils'
import { generateLazyValidator } from '../../../src/validation/index.js'

const validatePreviewMessageType = generateLazyValidator(previewMessageTypeSchema)

describe('PreviewMessageType tests', () => {
  const previewMessageType: PreviewMessageType = PreviewMessageType.LOAD

  testTypeSignature({ schema: previewMessageTypeSchema }, previewMessageType)

  it('static tests must pass', () => {
    expect(validatePreviewMessageType(previewMessageType)).toEqual(true)
    expect(validatePreviewMessageType(null)).toEqual(false)
    expect(validatePreviewMessageType({})).toEqual(false)
  })

  it('should send a LOAD message', () => {
    const fakeWindow = { postMessage: sinon.fake() }
    sendMessage(fakeWindow, PreviewMessageType.LOAD, null)
    expect(
      fakeWindow.postMessage.calledOnceWith({
        type: PreviewMessageType.LOAD,
        payload: null
      })
    )
  })

  it('should send an ERROR message', () => {
    const fakeWindow = { postMessage: sinon.fake() }
    sendMessage(fakeWindow, PreviewMessageType.ERROR, {
      message: 'Some error'
    })
    expect(
      fakeWindow.postMessage.calledOnceWith({
        type: PreviewMessageType.ERROR,
        payload: { message: 'Some error' }
      })
    )
  })

  it('should send an UPDATE message', () => {
    const fakeWindow = { postMessage: sinon.fake() }
    sendMessage(fakeWindow, PreviewMessageType.UPDATE, {
      options: { hair: '#ff0000', skin: '#cccccc' }
    })
    expect(
      fakeWindow.postMessage.calledOnceWith({
        type: PreviewMessageType.ERROR,
        payload: { options: { hair: '#ff0000', skin: '#cccccc' } }
      })
    )
  })
})
