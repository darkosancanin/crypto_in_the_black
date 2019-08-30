import React from "react";
import AsyncSelect from "react-select/async";
import styled from "styled-components";

export const Search = props => {
  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    fetch(`https://api.cryptointheblack.com/search/${inputValue}`).then(
      response => {
        response.json().then(data => {
          callback(
            data.map(d => {
              return { value: d.symbol, label: d.name };
            })
          );
        });
      }
    );
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
  `;

  const onCoinSelected = e => {
    props.history.push(`/${e.value}`);
  };

  return (
    <SearchContainer>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        styles={selectCustomStyles}
        onChange={onCoinSelected}
        placeholder="Search for coin..."
      />
    </SearchContainer>
  );
};
