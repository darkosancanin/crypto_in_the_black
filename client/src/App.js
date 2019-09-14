import React from "react";
import { CoinContextProvider } from "./CoinContext";
import { CryptoInTheBlack } from "./CryptoInTheBlack";

function App() {
  return (
    <CoinContextProvider>
      <CryptoInTheBlack />
    </CoinContextProvider>
  );
}

export default App;
