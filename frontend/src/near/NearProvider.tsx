import React, { FC, createContext, useState, PropsWithChildren } from "react";

import { connect, WalletConnection, Near } from "near-api-js";

import { APP_KEY_PREFIX, config } from "./config";

type NearContextValue = { near: Near, walletConnection: WalletConnection } | null;

const NearContext = createContext<NearContextValue>(null);

const NearProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [value, init] = useState<NearContextValue>(null);

  React.useEffect(() => {
    (async () => {
      const near: Near = await connect(config);
      const walletConnection = new WalletConnection(near, APP_KEY_PREFIX);
      if (near && walletConnection) {
        init({
          near,
          walletConnection
        });
      }
    })();
  }, []);

  return <NearContext.Provider value={value}>{children}</NearContext.Provider>;
};

export { NearContext, NearProvider };
