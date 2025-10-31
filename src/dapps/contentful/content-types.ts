import { AlignmentFieldType, LocalizedField, SysLink } from './client'

type MarketingAdminFields = {
  name: LocalizedField<string>
  campaign?: LocalizedField<SysLink<'Entry'>>
  marketplaceHomepageBanner?: LocalizedField<SysLink<'Entry'>>
  marketplaceCollectiblesBanner?: LocalizedField<SysLink<'Entry'>>
  marketplaceCampaignCollectiblesBanner?: LocalizedField<SysLink<'Entry'>>
  builderCampaignBanner?: LocalizedField<SysLink<'Entry'>>
}

type CampaignFields = {
  name: LocalizedField<string>
  mainTag?: LocalizedField<string>
  marketplaceTabName?: LocalizedField<string>
  additionalTags?: LocalizedField<string[]>
}

type BannerFields = {
  desktopTitle: LocalizedField<string>
  desktopTitleAlignment: LocalizedField<AlignmentFieldType>
  mobileTitle: LocalizedField<string>
  mobileTitleAlignment: LocalizedField<AlignmentFieldType>
  // Uses any to prevent installing the contentful types, but it should be LocalizedField<Document>
  desktopText: LocalizedField<any>
  desktopTextAlignment: LocalizedField<AlignmentFieldType>
  // Uses any to prevent installing the contentful types, but it should be LocalizedField<Document>
  mobileText: LocalizedField<any>
  mobileTextAlignment: LocalizedField<AlignmentFieldType>
  showButton: LocalizedField<boolean>
  buttonLink?: LocalizedField<string>
  buttonsText?: LocalizedField<string>
  desktopButtonAlignment: LocalizedField<AlignmentFieldType>
  mobileButtonAlignment: LocalizedField<AlignmentFieldType>
  fullSizeBackground: LocalizedField<SysLink<'Asset'>>
  mobileBackground: LocalizedField<SysLink<'Asset'>>
  logo?: LocalizedField<SysLink<'Asset'>>
}

export { MarketingAdminFields, CampaignFields, BannerFields }
