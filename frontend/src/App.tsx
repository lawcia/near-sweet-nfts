import React from "react";

import Gallery from "./components/Gallery";
import Login from "./components/Login";
import Banner from "./components/Banner";

import { useNFTContract } from "./near/useNFTContract";

import "./App.css";

function App() {
  const { isAuthenticated } = useNFTContract();
  return (
    <div className="App">
      {isAuthenticated && <Banner />}
      <h1>Sweet NFTs</h1>
      {isAuthenticated ? <Gallery /> : <Login />}
    </div>
  );
}

export default App;
