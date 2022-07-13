import * as nearApi from "near-api-js";

export const config: nearApi.ConnectConfig = {
  networkId: "default",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  headers: {

  },
  deps: {
    keyStore: new nearApi.keyStores.BrowserLocalStorageKeyStore(),
  },
};

export const NFT_CONTRACT = process.env.REACT_APP_NFT_CONTRACT || "" 
export const APP_KEY_PREFIX = "nft_uifb9b9t0jg99fm59u"
