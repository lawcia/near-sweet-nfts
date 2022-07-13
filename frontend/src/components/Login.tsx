import { FC } from "react";
import { useNFTContract } from "../near/useNFTContract";

import "./Login.css";

const Login: FC = () => {
  const { login } = useNFTContract();
  return (
    <div className="login">
      <p>
        Welcome to SweetNFTs. This platform was built on the NEAR Blockchain.
        Please login to your NEAR wallet to view the available SweetNFTs
      </p>
      <button className="login-button" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default Login;
