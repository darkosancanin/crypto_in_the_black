import React from "react";
import AsyncSelect from "react-select/async";

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
    control: (provided, state) => ({
      ...provided,
      padding: "5px"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#EDDA36" : "white",
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
