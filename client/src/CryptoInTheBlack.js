import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer } from "./Footer";
import Logo from "./logo.svg";
import { CoinInfo } from "./CoinInfo";
import { Search } from "./Search";

export const CryptoInTheBlack = () => {
  const Background = styled.div`
    background-image: url("/crypto_in_the_black_bg.jpg");
    height: 100vh;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
  `;

  const FlexContainer = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  `;

  const MainContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-left: 50px;
    padding-right: 50px;
  `;

  const Title = styled.span`
    margin-left: 20px;
    font-size: 1.5em;
    @media (max-width: 768px) {
      display: block;
    }
  `;

  const HeaderContent = styled.div`
    font-size: 1.5rem;
    font-weight: 300;
    color: white;
    margin-top: 50px;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
  `;

  const HeadingImg = styled.img`
    vertical-align: middle;
    margin-bottom: 15px;
  `;

  const Heading = styled.div`
    margin-bottom: 50px;
  `;

  return (
    <Background>
      <FlexContainer>
        <MainContent>
          <HeaderContent>
            <Heading>
              <HeadingImg src={Logo} alt="Crypto In The Black" />
              <Title>Crypto In The Black</Title>
            </Heading>
            Find out how many days it has been protifable to buy and hold
            different cryptocurrencies.
          </HeaderContent>
          <Search />
          <Router>
            <Route path="/:symbol?" component={CoinInfo} />
          </Router>
        </MainContent>
        <Footer />
      </FlexContainer>
    </Background>
  );
};
