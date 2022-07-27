import { Emote, EmoteRepresentationADR74 } from "../../platform";

/** @alpha */
export type EmoteRepresentationDefinition = Omit<
  EmoteRepresentationADR74,
  "contents"
> & {
  contents: {
    key: string;
    url: string;
  }[];
};

export type EmoteDefinition = Omit<Emote, "emoteDataADR74"> & {
  emoteDataADR74: Omit<Emote["emoteDataADR74"], "representations"> & {
    representations: EmoteRepresentationDefinition[];
  };
};
