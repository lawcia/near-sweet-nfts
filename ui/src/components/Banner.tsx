import { FC } from "react";

import { useNFTContract } from "../near/useNFTContract";

import "./Banner.css";

const Banner: FC = () => {
  const { logout, getUser } = useNFTContract();
  return (
    <div className="banner">
      <p>{getUser()}</p>
      <button className="banner-button" onClick={logout}>Logout</button>
    </div>
  );
};

export default Banner;
