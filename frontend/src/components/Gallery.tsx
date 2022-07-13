import { FC, useEffect, useState } from "react";

import "./Gallery.css";

import Traits from "./Traits";

import { GalleryItem } from "../model";
import { useNFTContract } from "../near/useNFTContract";

const Gallery: FC = () => {
  const { getUser, getNFTs, mintNFT } = useNFTContract();
  const [data, setData] = useState<GalleryItem[]>([]);
  const [nftsForUser, setNftsForUser] = useState<Record<string, any>>({});
  const [error, setError] = useState<string>("");
  const accountId = getUser();

  useEffect(() => {
    setError("");
    getNFTs()
      .then(([nfts, galleryData]) => {
        const log: Record<string, boolean> = {};
        nfts.forEach((nft: { token_id: string | number }) => {
          log[nft.token_id] = true;
        });
        setNftsForUser(log);
        setData(galleryData);
        setError("");
      })
      .catch(() => {
        setError("Could not get NFTs. Please try again latter");
        setData([]);
      });
  }, [getNFTs]);

  const mint = (item: GalleryItem) => {
    mintNFT(accountId, item.id, {
      title: item.metaData.title,
      description: item.metaData.description,
      media: item.metaData.src,
      extra: JSON.stringify(item.metaData.extra),
    });
  };

  return (
    <div className="gallery">
      {error && <p className="gallery-error">{error}</p>}
      {data.map((item) => {
        const {
          metaData: {
            title,
            description,
            src,
            alt,
            extra: { traits },
          },
        } = item;
        const isMinted = nftsForUser[item.id];
        return (
          <div key={item.id} className="gallery-item">
            <img className="gallery-image" src={src} alt={alt} />
            <p className="gallery-title">{title}</p>
            <p>{description}</p>
            <Traits traits={traits} />
            <button
              className="gallery-button"
              disabled={isMinted}
              onClick={() => mint(item)}
            >
              {isMinted ? "Minted" : "Mint this NFT"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
