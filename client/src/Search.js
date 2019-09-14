import React, { useContext } from "react";
import AsyncSelect from "react-select/async";
import styled from "styled-components";
import { CoinContext } from "./CoinContext";
import { API_BASE_URL } from "./Api";

export const Search = () => {
  const coinContext = useContext(CoinContext);
  const loadOptions = (inputValue, callback) => {
    if (!inputValue && coinContext.defaultSearchResults.length > 0) {
      callback(coinContext.defaultSearchResults);
      return;
    }
    fetch(`${API_BASE_URL}/search/${inputValue}`).then(response => {
      response.json().then(data => {
        var results = data.map(d => {
          return { value: d.symbol, label: d.name };
        });
        if (!inputValue) coinContext.setDefaultSearchResults(results);
        callback(results);
      });
    });
  };

  const selectCustomStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "5px"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#EDDA36" : "white",
      color: "black"
    })
  };

  const SearchContainer = styled.div`
    width: 580px;
    margin: 0 auto;
    @media (max-width: 650px) {
      width: 320px;
    }
  `;

  return (
    <SearchContainer>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        styles={selectCustomStyles}
        onChange={e => coinContext.setSymbol(e.value)}
        placeholder="Search for coin..."
      />
    </SearchContainer>
  );
};
