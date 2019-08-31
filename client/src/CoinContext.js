import React, { useState } from "react";

const CoinContext = React.createContext({});

const CoinContextProvider = props => {
  const [symbol, setSymbol] = useState(undefined);
  const [defaultSearchResults, setDefaultSearchResults] = useState([]);

  return (
    <CoinContext.Provider
      value={{
        symbol,
        setSymbol,
        defaultSearchResults,
        setDefaultSearchResults
      }}
    >
      {props.children}
    </CoinContext.Provider>
  );
};

export { CoinContext, CoinContextProvider };
