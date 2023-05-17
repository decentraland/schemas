import expect from 'expect'
import { Rarity, EmoteCategory } from '../../../../src'
import { Locale, BodyShape, Emote, EmoteRepresentationADR74, isStandard, isThirdParty } from '../../../../src'
import { expectValidationFailureWithErrors, testTypeSignature } from '../../../test-utils'

describe('Emote tests', () => {
  const representation: EmoteRepresentationADR74 = {
    bodyShapes: [BodyShape.FEMALE],
    mainFile: 'file1',
    contents: ['file1', 'file2']
  }

  const baseEmote = {
    id: 'some id',
    name: 'name',
    description: 'some description',
    i18n: [
      {
        code: Locale.EN,
        text: 'some id'
      }
    ],
    thumbnail: 'thumbnail.png',
    image: 'image.png'
  }

  const emoteDataADR74 = {
    category: EmoteCategory.DANCE,
    representations: [representation],
    tags: ['tag1'],
    loop: false
  }

  const standardProps = {
    collectionAddress: '0x...',
    rarity: Rarity.LEGENDARY
  }

  const thirdPartyProps = {
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
      hashingKeys: ['id', 'name', 'description', 'i18n', 'image', 'thumbnail', 'emoteDataADR74', 'content'],
      entityHash: '52c312f5e5524739388af971cddb526c3b49ba31ec77abc07ca01f5b113f1eba'
    }
  }

  const standardEmote = {
    ...baseEmote,
    ...standardProps,
    emoteDataADR74
  }
  const thirdPartyEmote = {
    ...baseEmote,
    ...thirdPartyProps,
    emoteDataADR74
  }
  testTypeSignature(Emote, standardEmote)
  testTypeSignature(Emote, thirdPartyEmote)

  it('static tests must pass', () => {
    expect(Emote.validate(standardEmote)).toEqual(true)
    expect(Emote.validate(thirdPartyEmote)).toEqual(true)
    expect(Emote.validate(null)).toEqual(false)
    expect(Emote.validate({})).toEqual(false)
  })

  it('static tests must return the correct errors when missing properties', () => {
    expectValidationFailureWithErrors(Emote.validate, {}, [
      "must have required property 'id'",
      "must have required property 'description'",
      "must have required property 'name'",
      "must have required property 'i18n'",
      "must have required property 'thumbnail'",
      "must have required property 'image'",
      "must have required property 'emoteDataADR74'"
    ])
  })

  it('emote with two i18n with same locale fails', () => {
    expectValidationFailureWithErrors(
      Emote.validate,
      {
        ...standardEmote,
        i18n: [
          { code: Locale.ES, text: 'texto' },
          { code: Locale.ES, text: 'otro texto' }
        ]
      },
      ['"i18n" array should not have duplicates for "code"']
    )
  })

  it('emote without representation fails', () => {
    expectValidationFailureWithErrors(
      Emote.validate,
      {
        ...standardEmote,
        emoteDataADR74: {
          ...standardEmote.emoteDataADR74,
          representations: []
        }
      },
      ['must NOT have fewer than 1 items']
    )
  })

  it('emote with merkle proof and standard fields fails', () => {
    expectValidationFailureWithErrors(
      Emote.validate,
      {
        ...baseEmote,
        ...standardProps,
        ...thirdPartyProps,
        emoteDataADR74
      },
      [
        'standard properties conditions are not met',
        'thirdparty properties conditions are not met',
        'emote should have either standard or thirdparty properties',
        'emote should have "emoteDataADR74" and match its schema'
      ]
    )
  })

  it('emote should be standard and/or thirdparty', () => {
    expectValidationFailureWithErrors(
      Emote.validate,
      {
        ...baseEmote,
        emoteDataADR74
      },
      [
        'standard properties conditions are not met',
        'thirdparty properties conditions are not met',
        'emote should have either standard or thirdparty properties',
        'emote should have "emoteDataADR74" and match its schema'
      ]
    )
  })

  it('emote with standard props is standard', () => {
    expect(isStandard(standardEmote)).toBeTruthy()
  })

  it('emote with thirdparty props is thirdParty', () => {
    expect(isThirdParty(thirdPartyEmote)).toBeTruthy()
  })

  it('group of properties must be complete, not partial', () => {
    // misses 'rarity' to complete standard properties
    expectValidationFailureWithErrors(
      Emote.validate,
      {
        ...baseEmote,
        collectionAddress: '0x...',
        emoteDataADR74
      },
      [
        'standard properties conditions are not met',
        'thirdparty properties conditions are not met',
        'emote should have either standard or thirdparty properties',
        'emote should have "emoteDataADR74" and match its schema'
      ]
    )
  })

  it('thirdparty emote with not all hasing keys present fails', () => {
    const notValidThirdPartyProps = {
      content: {
        'thumbnail.png': 'someHash'
      },
      merkleProof: {
        index: 61575,
        proof: [
          '0xc8ae2407cffddd38e3bcb6c6f021c9e7ac21fcc60be44e76e4afcb34f637d562',
          '0x16123d205a70cdeff7643de64cdc69a0517335d9c843479e083fd444ea823172'
        ],
        hashingKeys: [
          'id',
          'name',
          'description',
          'i18n',
          'image',
          'thumbnail',
          'emoteDataADR74',
          'content',
          'notPresentKey'
        ],
        entityHash: '52c312f5e5524739388af971cddb526c3b49ba31ec77abc07ca01f5b113f1eba'
      }
    }
    const notThirdPartyEmote = {
      ...baseEmote,
      ...notValidThirdPartyProps,
      emoteDataADR74
    }
    expectValidationFailureWithErrors(Emote.validate, notThirdPartyEmote, [
      'standard properties conditions are not met',
      'thirdparty properties conditions are not met',
      'emote should have either standard or thirdparty properties',
      'emote should have "emoteDataADR74" and match its schema'
    ])
    expect(isThirdParty(notThirdPartyEmote)).toEqual(false)
  })

  it('thirdparty emote contain all hasing keys but does not have all the required ones', () => {
    const thirdPartyPropsMissingImage = {
      content: {
        'thumbnail.png': 'someHash'
      },
      merkleProof: {
        index: 61575,
        proof: [
          '0xc8ae2407cffddd38e3bcb6c6f021c9e7ac21fcc60be44e76e4afcb34f637d562',
          '0x16123d205a70cdeff7643de64cdc69a0517335d9c843479e083fd444ea823172'
        ],
        hashingKeys: ['id', 'name', 'description', 'i18n', 'thumbnail', 'emoteDataADR74', 'content'],
        entityHash: '52c312f5e5524739388af971cddb526c3b49ba31ec77abc07ca01f5b113f1eba'
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...baseEmoteWithoutImage } = baseEmote
    const notThirdPartyEmote = {
      ...baseEmoteWithoutImage,
      ...thirdPartyPropsMissingImage,
      emoteDataADR74
    }
    expectValidationFailureWithErrors(Emote.validate, notThirdPartyEmote, [
      'thirdparty properties conditions are not met'
    ])
  })
})
