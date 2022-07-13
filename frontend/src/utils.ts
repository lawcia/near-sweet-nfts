import { TRAIT, SHAPE, COLOUR, FOOD } from "./constants";
import { GalleryItem } from "./model";

const metaDataConfig: {
  title: string;
  description: string;
  src: string;
  traits: {
    [s: string]: string;
  };
}[] = [
  {
    title: "Graceful Ice Cream",
    description: "Baby Pink Graceful Ice Cream",
    src: "https://firebasestorage.googleapis.com/v0/b/intwomensday-92ac2.appspot.com/o/circle_baby_pink_ice_cream.png?alt=media",
    traits: {
      [TRAIT.SHAPE]: SHAPE.CIRCLE,
      [TRAIT.COLOUR]: COLOUR.BABY_PINK,
      [TRAIT.FOOD]: FOOD.ICE_CREAM,
    },
  },
  {
    title: "Upbeat Candy",
    description: "Dark Pink Upbeat Candy",
    src: "https://firebasestorage.googleapis.com/v0/b/intwomensday-92ac2.appspot.com/o/circle_dark_pink_candy.png?alt=media",
    traits: {
      [TRAIT.SHAPE]: SHAPE.CIRCLE,
      [TRAIT.COLOUR]: COLOUR.DARK_PINK,
      [TRAIT.FOOD]: FOOD.CANDY,
    },
  },
  {
    title: "Sparkling Cookie",
    description: "Dull Pink Sparkling Cookie",
    src: "https://firebasestorage.googleapis.com/v0/b/intwomensday-92ac2.appspot.com/o/circle_dull_pink_cookie.png?alt=media",
    traits: {
      [TRAIT.SHAPE]: SHAPE.CIRCLE,
      [TRAIT.COLOUR]: COLOUR.DULL_PINK,
      [TRAIT.FOOD]: FOOD.COOKIE,
    },
  },
  {
    title: "Mad Cookie",
    description: "Mad Light Pink Cookie",
    src: "https://firebasestorage.googleapis.com/v0/b/intwomensday-92ac2.appspot.com/o/circle_light_pink_cookie.png?alt=media",
    traits: {
      [TRAIT.SHAPE]: SHAPE.CIRCLE,
      [TRAIT.COLOUR]: COLOUR.LIGHT_PINK,
      [TRAIT.FOOD]: FOOD.COOKIE,
    },
  },
  {
    title: "Serious Ice Cream",
    description: "Serious Baby Pink Ice Cream",
    src: "https://firebasestorage.googleapis.com/v0/b/intwomensday-92ac2.appspot.com/o/sqaure_baby_pink_ice_cream.png?alt=media",
    traits: {
      [TRAIT.SHAPE]: SHAPE.SQUARE,
      [TRAIT.COLOUR]: COLOUR.BABY_PINK,
      [TRAIT.FOOD]: FOOD.ICE_CREAM,
    },
  },
  {
    title: "Sulky Ice Cream",
    description: "Sulky Bright Pink Ice Cream",
    src: "https://firebasestorage.googleapis.com/v0/b/intwomensday-92ac2.appspot.com/o/sqaure_bright_pink_ice_cream.png?alt=media",
    traits: {
      [TRAIT.SHAPE]: SHAPE.SQUARE,
      [TRAIT.COLOUR]: COLOUR.BRIGHT_PINK,
      [TRAIT.FOOD]: FOOD.ICE_CREAM,
    },
  },
];

const getId = (accountId: string, title: string) => {
  return `${accountId}_${title.split(" ").join("_").toLocaleLowerCase()}`;
};

const getRarityLog = () => {
  const log = new Map();
  metaDataConfig.forEach((config) => {
    Object.keys(config.traits).forEach((trait) => {
      let group;
      if (log.has(trait)) {
        group = log.get(trait);
        const value = config.traits[trait];
        group.values[value] = group.values.hasOwnProperty(value)
          ? group.values[value] + 1
          : 1;
      } else {
        group = { values: { [config.traits[trait]]: 1 } };
      }
      group.count = group.count ? group.count + 1 : 1;
      log.set(trait, group);
    });
  });

  return log;
};

const getTraits = (
  traits: { [x: string]: string | number },
  log: Map<any, any>
) => {
  const validatedTraits: { trait: string; value: string; rarity: string }[] =
    [];
  Object.keys(traits).forEach((trait) => {
    const config = log.get(trait);
    const percentage = (config.values[traits[trait]] / config.count) * 100;
    if (!isNaN(percentage)) {
      validatedTraits.push({
        trait,
        value: traits[trait].toString(),
        rarity: `${percentage.toFixed(0)}%`,
      });
    }
  });
  return validatedTraits;
};

export const getGalleryData = (accountId: string): GalleryItem[] => {
  const rarityLog = getRarityLog();
  const galleryData = metaDataConfig.map((config) => {
    return {
      id: getId(accountId, config.title),
      metaData: {
        title: config.title,
        description: config.description,
        src: config.src,
        alt: config.title,
        extra: {
          traits: getTraits(config.traits, rarityLog),
        },
      },
    };
  });
  return galleryData;
};

export const logger = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
}
