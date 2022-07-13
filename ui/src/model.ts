interface MetaData {
  title: string;
  description: string;
  src: string;
  alt: string;
  extra: {
    traits: TraitData[];
  };
}

interface TraitData {
  trait: string;
  value: string;
  rarity: string;
}

interface GalleryItem {
    id?: string;
    isMinted?: boolean;
    metaData: MetaData
}

export type { MetaData, TraitData, GalleryItem };
