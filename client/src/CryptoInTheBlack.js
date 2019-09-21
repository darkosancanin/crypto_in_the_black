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
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
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
    padding-left: 25px;
    padding-right: 25px;
  `;

  const Title = styled.span`
    margin-left: 20px;
    font-size: 1.5em;
    color: white;
    @media (max-width: 768px) {
      display: block;
    }
  `;

  const HeadingImg = styled.img`
    vertical-align: middle;
    margin-bottom: 10px;
  `;

  const Heading = styled.div`
    margin: 25px 0 0 0;
    font-size: 1.5rem;
    font-weight: 300;
  `;

  const IntroParagraph = styled.div`
    margin: 25px 0 25px 0;
    color: white;
    font-size: 1.5rem;
    font-weight: 300;
  `;

  return (
    <Background>
      <FlexContainer>
        <MainContent>
          <Heading>
            <HeadingImg src={Logo} alt="Crypto In The Black" />
            <Title>Crypto In The Black</Title>
          </Heading>
          <IntroParagraph>
            Find out how many days it has been protifable to buy and hold
            different cryptocurrencies.
          </IntroParagraph>
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
