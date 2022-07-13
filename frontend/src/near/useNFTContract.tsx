import { useState, useContext, useEffect } from "react";

import { Contract } from "near-api-js";

import { NearContext } from "./NearProvider";

import { getGalleryData, logger } from "../utils";

import { NFT_CONTRACT } from "./config";

import { BN } from "bn.js";

interface NFTContract extends Contract {
  nft_tokens_for_owner: (args: { account_id: string }) => Promise<any>;
  nft_mint: (args: any, gas: any, bn: any) => Promise<any>;
}

const useNFTContract = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [contractBackup, setContractBackup] = useState<NFTContract>();
  const context = useContext(NearContext);

  useEffect(() => {
    if (context === null) {
      return;
    }
    setIsAuthenticated(context.walletConnection.isSignedIn());
  }, [context]);

  const logout = () => {
    if (context !== null) {
      context.walletConnection.signOut();
    }
    window.location.replace(window.location.origin + window.location.pathname);
  };

  const login = () => {
    if (context === null) {
      logger("Could not login user");
      return;
    }
    logger("Logging in user");
    context.walletConnection.requestSignIn(NFT_CONTRACT);
    try {
      initContract();
    } catch {
      logger("Could not init contract")
    }
  };

  const initContract = () => {
    if (context === null) {
      throw new Error("NEAR context is null");
    }

    let contract: NFTContract;

    if (contractBackup === undefined) {
      contract = new Contract(
        context.walletConnection.account(),
        NFT_CONTRACT,
        {
          viewMethods: ["nft_tokens_for_owner"],
          changeMethods: ["nft_mint"],
        }
      ) as NFTContract;

      setContractBackup(contract);
    } else {
      contract = contractBackup;
    }
    return contract;
  };

  const getNFTs = () => {
    const id = getUser()
    const galleryData = getGalleryData(id)
    logger("Started getting nfts by account id");
    const contract = initContract();
    logger("invoking contract");
    return Promise.all([contract.nft_tokens_for_owner({ account_id: id }), galleryData]);
  };

  const mintNFT = (accountId: string, tokenId: string, metadata: any) => {
    logger("Started minting the nft");
    const contract = initContract();
    logger("invoking contract");
    contract
      .nft_mint(
        {
          token_id: tokenId,
          metadata,
          receiver_id: accountId,
        },
        300000000000000,
        new BN("1000000000000000000000000")
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUser = () => {
    if (context === null) return "";
    return context.walletConnection.getAccountId();
  };

  return {
    isAuthenticated,
    logout,
    login,
    getNFTs,
    mintNFT,
    getUser,
  };
};

export { useNFTContract };
