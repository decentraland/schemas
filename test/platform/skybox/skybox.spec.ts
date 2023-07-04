import expect from 'expect'
import { Skybox } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('Skybox tests', () => {
  const skybox: Skybox = {
    id: 'id',
    name: 'name',
    description: 'description',
    thumbnail: 'thumbnail',
    unityPackage: 'unityPackage'
  }

  testTypeSignature(Skybox, skybox)

  it('static tests must pass', () => {
    expect(Skybox.validate(skybox)).toEqual(true)
    expect(Skybox.validate(null)).toEqual(false)
    expect(Skybox.validate({})).toEqual(false)
  })

  it('static tests must return the correct error when missing name', () => {
    const validate = Skybox.validate
    expect(validate({})).toEqual(false)
    expect(validate.errors).toHaveLength(3)
    expect(validate.errors![0].message).toEqual("must have required property 'id'")
    expect(validate.errors![1].message).toEqual("must have required property 'name'")
    expect(validate.errors![2].message).toEqual("must have required property 'unityPackage'")
  })
})
