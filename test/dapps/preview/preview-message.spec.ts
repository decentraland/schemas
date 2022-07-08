import expect from 'expect'
import sinon from 'sinon'
import { PreviewMessageType, sendMessage } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('PreviewMessageType tests', () => {
  const previewMessageType: PreviewMessageType = PreviewMessageType.LOAD

  testTypeSignature(PreviewMessageType, previewMessageType)

  it('static tests must pass', () => {
    expect(PreviewMessageType.validate(previewMessageType)).toEqual(true)
    expect(PreviewMessageType.validate(null)).toEqual(false)
    expect(PreviewMessageType.validate({})).toEqual(false)
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
