import React from "react";
import Logo from "./logo.svg";
import { Search } from "./Search";
import styled from "styled-components";

function App() {
  const Background = styled.div`
    background-image: url("/stacked-coins-on-a-table.jpg");
    height: 100vh;
    width: 100vw;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
  `;

  const FlexContainer = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  `;

  const Footer = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 0.7rem;
    background-color: black;
    color: #ffffff;
    padding: 15px;
    opacity: 0.85;
  `;

  const FooterLink = styled.a`
    color: #ffffff;
    text-decoration: none;
  `;

  const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    text-align: center;
  `;

  const Title = styled.span`
    margin-left: 20px;
    font-size: 1.5em;
  `;

  const HeaderContent = styled.div`
    font-size: 1.5rem;
    font-weight: 300;
    color: white;
    margin-top: 50px;
    margin-bottom: 50px;
  `;

  const HeadingImg = styled.img`
    vertical-align: middle;
    margin-bottom: 15px;
  `;

  const Heading = styled.div`
    margin-bottom: 50px;
  `;

  const SearchContainer = styled.div`
    width: 580px;
    margin: 0 auto;
  `;

  return (
    <Background>
      <FlexContainer>
        <MainContent>
          <HeaderContent>
            <Heading>
              <HeadingImg src={Logo} />
              <Title>Crypto In The Black</Title>
            </Heading>
            Find out how many days it has been protifable to buy and hold
            different cryptocurrencies.
          </HeaderContent>
          <SearchContainer>
            <Search />
          </SearchContainer>
        </MainContent>
        <Footer>
          <div>
            <FooterLink href="https://www.coingecko.com">
              Data provided by CoinGecko
            </FooterLink>
            <br />
            &copy; CryptoInTheBlack.com {new Date().getFullYear()}
          </div>
        </Footer>
      </FlexContainer>
    </Background>
  );
}

export default App;
