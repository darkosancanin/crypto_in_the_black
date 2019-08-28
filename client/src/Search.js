import React from "react";
import AsyncSelect from "react-select/async";
import "./Search.css";

export const Search = () => {
  const loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    const url = `https://api.cryptointheblack.com/search/${inputValue}`;
    fetch(url).then(response => {
      response.json().then(data => {
        callback(
          data.map(d => {
            return { value: d.symbol, label: d.name };
          })
        );
      });
    });
  };

  const selectCustomStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black"
    })
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      styles={selectCustomStyles}
    />
  );
};
