import expect from 'expect'
import { SpringBoneParams } from '../../../src'
import { testTypeSignature } from '../../test-utils'

describe('SpringBoneParams tests', () => {
  const springBoneParams: SpringBoneParams = {
    stiffness: 1.5,
    gravityPower: 3.0,
    gravityDir: [0, -1, 0],
    drag: 0.4
  }

  testTypeSignature(SpringBoneParams, springBoneParams)

  it('static tests must pass', () => {
    expect(SpringBoneParams.validate(springBoneParams)).toEqual(true)
    expect(SpringBoneParams.validate(null)).toEqual(false)
    expect(SpringBoneParams.validate({})).toEqual(false)
  })

  it('validates with optional center field', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, center: 'Avatar_Hips' })).toEqual(true)
  })

  it('validates without optional center field', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams })).toEqual(true)
  })

  it('rejects center with wrong type', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, center: 5 })).toEqual(false)
  })

  it('validates with optional isRoot field', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, isRoot: true })).toEqual(true)
    expect(SpringBoneParams.validate({ ...springBoneParams, isRoot: false })).toEqual(true)
  })

  it('validates without optional isRoot field', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams })).toEqual(true)
  })

  it('rejects isRoot with wrong type', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, isRoot: 'yes' })).toEqual(false)
  })

  it('rejects stiffness out of range', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, stiffness: 6 })).toEqual(false)
    expect(SpringBoneParams.validate({ ...springBoneParams, stiffness: -1 })).toEqual(false)
  })

  it('rejects gravityPower out of range', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, gravityPower: 11 })).toEqual(false)
    expect(SpringBoneParams.validate({ ...springBoneParams, gravityPower: -0.1 })).toEqual(false)
  })

  it('rejects drag out of range', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, drag: 1.1 })).toEqual(false)
    expect(SpringBoneParams.validate({ ...springBoneParams, drag: -0.01 })).toEqual(false)
  })

  it('rejects gravityDir with wrong length', () => {
    expect(SpringBoneParams.validate({ ...springBoneParams, gravityDir: [0, -1] as any })).toEqual(false)
    expect(SpringBoneParams.validate({ ...springBoneParams, gravityDir: [0, -1, 0, 0] as any })).toEqual(false)
  })

  it('rejects missing required fields', () => {
    expect(SpringBoneParams.validate({ stiffness: 1, gravityPower: 1, gravityDir: [0, -1, 0] })).toEqual(false)
  })
})
