import React from 'react';
import AsyncSelect from 'react-select/async';


export const Search = () => {
    const loadOptions = (inputValue, callback) => {
        const url = `https://api.cryptointheblack.com/search/${inputValue}`;
        fetch(url).then(x => {
            console.log(x);
        });
        //console.log(inputValue);
        // setTimeout(() => {
        //   callback([
        //     { value: 'chocolate', label: 'Chocolate' },
        //     { value: 'strawberry', label: 'Strawberry' },
        //     { value: 'vanilla', label: 'Vanilla' }
        //   ]);
        // }, 1000);
      };

    return (
        // <div className="searchbox"><input type="text" placeholder="e.g. bitcoin" /></div>
        <div>
        {/* <pre>inputValue: "{this.state.inputValue}"</pre> */}
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          //onInputChange={this.handleInputChange}
        />
      </div>
    );
}