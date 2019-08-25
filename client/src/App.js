import React from 'react';
import Logo from './logo.svg'
import './App.css';

function App() {
  return (
    <div className="container">
      <header className="header">
        <img src={Logo}></img><span className="title">Crypto In The Black</span>
      </header>
      <div className="content">
        <div className="description">Find out how many days it has been protifable to buy and hold different cryptocurrencies.</div>
        <div className="searchbox"><input type="text" placeholder="e.g. bitcoin" /></div>
      </div>
      <footer className="footer">
        <div>
          <a href="https://www.coingecko.com">Data provided by CoinGecko</a>
          <br/>
          &copy; CryptoInTheBlack.com {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}

export default App;
