import { generateLazyValidator, JSONSchema, ValidateFunction } from '../../../validation'

export enum Language {
  MANDARIN_CHINESE = 'Mandarin Chinese',
  SPANISH = 'Spanish',
  ENGLISH = 'English',
  PORTUGUESE = 'Portuguese',
  FRENCH = 'French',
  HINDI = 'Hindi',
  BENGALI = 'Bengali',
  RUSSIAN = 'Russian',
  JAPANESE = 'Japanese',
  YUE_CHINESE = 'Yue Chinese',
  VIETNAMESE = 'Vietnamese',
  TURKISH = 'Turkish',
  WU_CHINESE = 'Wu Chinese',
  MARATHI = 'Marathi',
  TELUGU = 'Telugu',
  KOREAN = 'Korean',
  TAMIL = 'Tamil',
  EGYPTIAN_SPOKEN_ARABIC = 'Egyptian Spoken Arabic',
  STANDARD_GERMAN = 'Standard German',
  URDU = 'Urdu (excl. Hindi)',
  JAVANESE = 'Javanese',
  WESTERN_PUNJABI = 'Western Punjabi (excl. Eastern Punjabi)',
  ITALIAN = 'Italian',
  GUJARATI = 'Gujarati',
  IRANIAN_PERSIAN = 'Iranian Persian (excl. Dari and Tajik)',
  BHOJPURI = 'Bhojpuri',
  HAUSA = 'Hausa',
  OTHER = 'Other'
}

export namespace Language {
  export const schema: JSONSchema<Language> = {
    type: 'string',
    enum: Object.values(Language),
    default: Language.NONE
  }
  export const validate: ValidateFunction<Language> = generateLazyValidator(schema)
}

type LanguageInfo = {
  language: string
  speakers: number
  family: string
  branch: string
}

export const languageMap: Map<Language, LanguageInfo> = new Map([
  [
    Language.MANDARIN_CHINESE,
    { language: 'Mandarin Chinese', speakers: 939, family: 'Sino-Tibetan', branch: 'Sinitic' }
  ],
  [Language.SPANISH, { language: 'Spanish', speakers: 485, family: 'Indo-European', branch: 'Romance' }],
  [Language.ENGLISH, { language: 'English', speakers: 380, family: 'Indo-European', branch: 'Germanic' }],
  [Language.PORTUGUESE, { language: 'Portuguese', speakers: 236, family: 'Indo-European', branch: 'Romance' }],
  [Language.FRENCH, { language: 'French', speakers: 80.8, family: 'Indo-European', branch: 'Romance' }],
  [Language.HINDI, { language: 'Hindi', speakers: 345, family: 'Indo-European', branch: 'Indo-Aryan' }],
  [Language.BENGALI, { language: 'Bengali', speakers: 234, family: 'Indo-European', branch: 'Indo-Aryan' }],
  [Language.RUSSIAN, { language: 'Russian', speakers: 147, family: 'Indo-European', branch: 'Balto-Slavic' }],
  [Language.JAPANESE, { language: 'Japanese', speakers: 123, family: 'Japonic', branch: 'Japanese' }],
  [Language.YUE_CHINESE, { language: 'Yue Chinese', speakers: 86.1, family: 'Sino - Tibetan', branch: 'Sinitic' }],
  [Language.VIETNAMESE, { language: 'Vietnamese', speakers: 85, family: 'Austroasiatic', branch: 'Vietic' }],
  [Language.TURKISH, { language: 'Turkish', speakers: 84, family: 'Turkic', branch: 'Oghuz' }],
  [Language.WU_CHINESE, { language: 'Wu Chinese', speakers: 83.4, family: 'Sino-Tibetan', branch: 'Sinitic' }],
  [Language.MARATHI, { language: 'Marathi', speakers: 83.2, family: 'Indo-European', branch: 'Indo-Aryan' }],
  [Language.TELUGU, { language: 'Telugu', speakers: 83, family: 'Dravidian', branch: 'South-Central' }],
  [Language.KOREAN, { language: 'Korean', speakers: 81.7, family: 'Koreanic', branch: '—' }],
  [Language.TAMIL, { language: 'Tamil', speakers: 78.6, family: 'Dravidian', branch: 'South' }],
  [
    Language.EGYPTIAN_SPOKEN_ARABIC,
    { language: 'Egyptian Spoken Arabic', speakers: 77.4, family: 'Afroasiatic', branch: 'Semitic' }
  ],
  [
    Language.STANDARD_GERMAN,
    { language: 'Standard German', speakers: 75.3, family: 'Indo-European', branch: 'Germanic' }
  ],
  [Language.URDU, { language: 'Urdu (excl. Hindi)', speakers: 70.6, family: 'Indo-European', branch: 'Indo-Aryan' }],
  [Language.JAVANESE, { language: 'Javanese', speakers: 68.3, family: 'Austronesian', branch: 'Malayo-Polynesian' }],
  [
    Language.WESTERN_PUNJABI,
    {
      language: 'Western Punjabi (excl. Eastern Punjabi)',
      speakers: 66.7,
      family: 'Indo-European',
      branch: 'Indo-Aryan'
    }
  ],
  [Language.ITALIAN, { language: 'Italian', speakers: 64.6, family: 'Indo-European', branch: 'Romance' }],
  [Language.GUJARATI, { language: 'Gujarati', speakers: 57.1, family: 'Indo-European', branch: 'Indo-Aryan' }],
  [
    Language.IRANIAN_PERSIAN,
    { language: 'Iranian Persian (excl. Dari and Tajik)', speakers: 57.2, family: 'Indo-European', branch: 'Iranian' }
  ],
  [Language.BHOJPURI, { language: 'Bhojpuri', speakers: 52.3, family: 'Indo-European', branch: 'Indo-Aryan' }],
  [Language.HAUSA, { language: 'Hausa', speakers: 51.7, family: 'Afroasiatic', branch: 'Chadic' }]
])
