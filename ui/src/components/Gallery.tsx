import { FC } from "react";

import "./Gallery.css";

import Traits from "./Traits";

import { GalleryItem, MetaData } from "../model";
import { getGalleryData } from "../utils";

const Gallery: FC = () => {
  const accountId = 'hello'
  const data: GalleryItem[] = getGalleryData(accountId);

  const mint = (item: GalleryItem) => {
    console.log(item)
  };
  return (
    <div className="gallery">
      {data.map((item) => {
        const { metaData:{
          title,
          description,
          src,
          alt,
          extra: { traits } },
        } = item;
        return (
            <div key={item.id} className="gallery-item">
              <img className="gallery-image" src={src} alt={alt} />
              <p className="gallery-title">{title}</p>
              <p>{description}</p>
              <Traits traits={traits} />
              <button className="gallery-button" disabled={item.isMinted} onClick={() => mint(item)}>{item.isMinted ? 'Minted': 'Mint this NFT'}</button>
            </div>
        );
      })}
    </div>
  );
};

export default Gallery;
