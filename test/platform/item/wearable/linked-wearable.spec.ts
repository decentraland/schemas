import expect from 'expect'
import {
  BodyPartCategory,
  BodyShape,
  ContractNetwork,
  isThirdParty,
  Locale,
  MappingType,
  ThirdPartyProps,
  Wearable,
  WearableCategory,
  WearableRepresentation
} from '../../../../src'
import { expectValidationFailureWithErrors, testTypeSignature } from '../../../test-utils'

describe('Linked wearables tests', () => {
  const representation: WearableRepresentation = {
    bodyShapes: [BodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2'],
    overrideHides: [WearableCategory.HAIR, BodyPartCategory.HANDS],
    overrideReplaces: [BodyPartCategory.HANDS, WearableCategory.EYEWEAR]
  }

  const baseWearable = {
    id: 'some id',
    name: 'name',
    description: 'some description',
    data: {
      replaces: [WearableCategory.EYES, BodyPartCategory.HEAD],
      hides: [WearableCategory.EYEBROWS, BodyPartCategory.HANDS],
      tags: ['tag1'],
      representations: [representation],
      category: WearableCategory.UPPER_BODY,
      blockVrmExport: false,
      outlineCompatible: false
    },
    i18n: [
      {
        code: Locale.EN,
        text: 'some id'
      }
    ],
    thumbnail: 'thumbnail.png',
    image: 'image.png'
  }

  const thirdParty: ThirdPartyProps = {
    content: {
      'thumbnail.png': 'someHash',
      'iamge.png': 'someOtherHash'
    },
    merkleProof: {
      index: 61575,
      proof: [
        '0xc8ae2407cffddd38e3bcb6c6f021c9e7ac21fcc60be44e76e4afcb34f637d562',
        '0x16123d205a70cdeff7643de64cdc69a0517335d9c843479e083fd444ea823172',
        '0x1fbe73f1e71f11fb4e88de5404f3177673bdfc89e93d9a496849b4ed32c9b04f',
        '0xed60c527e6774dbf6750f7e28dbf93c25a22660085f709c3a0a772606768fd91',
        '0x7aff1c982d6a98544c126a0676ac98102533072b6c4506f31b413757e38f4c30',
        '0x5f5170cdf5fdd7bb25c225d08b48361e41f05477880812f7f5954e75daa6c667',
        '0x08ae25d236fa4105b2c5136938bc42f55d339f8e4d9feb776799681b8a8a48e7',
        '0xadfcc425df780be50983856c7de4d405a3ec054b74020628a9d13fdbaff35df7',
        '0xda4ee1c4148a25eefbef12a92cc6a754c6312c1ff15c059f46e049ca4e5ca43b',
        '0x98c363c32c7b1d7914332efaa19ad2bee7e110d79d7690650dbe7ce8ba1002a2',
        '0x0bd810301fbafeb4848f7b60a378c9017a452286836d19a108812682edf8a12a',
        '0x1533c6b3879f90b92fc97ec9a1db86f201623481b1e0dc0eefa387584c5d93da',
        '0x31c2c3dbf88646a964edd88edb864b536182619a02905eaac2a00b0c5a6ae207',
        '0xc2088dbbecba4f7dd06c689b7c1a1e6a822d20d4665b2f9353715fc3a5f0d588',
        '0x9e191109e34d166ac72033dce274a82c488721a274087ae97b62c9a51944e86f',
        '0x5ff2905107fe4cce21c93504414d9548f311cd27efe5696c0e03acc059d2e445',
        '0x6c764a5d8ded16bf0b04028b5754afbd216b111fa0c9b10f2126ac2e9002e2fa'
      ],
      hashingKeys: ['id', 'name', 'description', 'i18n', 'image', 'thumbnail', 'data', 'content', 'mappings'],
      entityHash: '52c312f5e5524739388af971cddb526c3b49ba31ec77abc07ca01f5b113f1eba'
    },
    mappings: {
      [ContractNetwork.MAINNET]: {
        '0x1234567890123456789012345678901234567890': [
          {
            type: MappingType.SINGLE,
            id: '0'
          }
        ]
      }
    }
  }

  const linkedWearable = { ...baseWearable, ...thirdParty }

  testTypeSignature(Wearable, linkedWearable)

  it('static base wearable must pass', () => {
    expect(
      Wearable.validate({
        ...baseWearable,
        id: 'urn:decentraland:off-chain:base-avatars:basemale'
      })
    ).toEqual(true)
  })

  it('static tests must pass', () => {
    expect(Wearable.validate(linkedWearable)).toEqual(true)
    expect(Wearable.validate(null)).toEqual(false)
    expect(Wearable.validate({})).toEqual(false)
  })

  it('static tests must return the correct errors when missing properties', () => {
    expectValidationFailureWithErrors(Wearable.validate, {}, [
      "must have required property 'id'",
      "must have required property 'description'",
      "must have required property 'name'",
      "must have required property 'i18n'",
      "must have required property 'thumbnail'",
      "must have required property 'image'"
    ])
  })

  it('wearable with thirdparty props is thirdParty', () => {
    expect(isThirdParty(linkedWearable)).toBeTruthy()
  })

  it('wearable with invalid mappings fails', () => {
    expectValidationFailureWithErrors(
      Wearable.validate,
      {
        ...linkedWearable,
        mappings: {
          bitcoin: {} // Makes third party properties invalid
        }
      },
      ['either standard XOR thirdparty properties conditions must be met']
    )
  })
})
