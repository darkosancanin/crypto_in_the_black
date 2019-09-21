import React from "react";
import Email from "./email.svg";
import GitHub from "./github.svg";
import styled from "styled-components";

export const Footer = () => {
  const FooterContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 0.7rem;
    background-color: black;
    color: #ffffff;
    padding: 15px;
    opacity: 0.85;
    margin-top: 15px;
  `;

  const FooterLink = styled.a`
    color: #ffffff;
    text-decoration: none;
  `;

  const FooterImg = styled.img`
    margin-top: 5px;
    margin-left: 5px;
  `;

  return (
    <FooterContainer>
      <div>
        <FooterLink href="https://www.coingecko.com">
          Data provided by CoinGecko
        </FooterLink>
        <br />
        &copy; CryptoInTheBlack.com {new Date().getFullYear()}
        <br />
        <a href="mailto:darko.sancanin@gmail.com">
          <FooterImg src={Email} alt="darko.sancanin@gmail.com" />
        </a>
        <a href="https://github.com/darkosancanin/crypto_in_the_black">
          <FooterImg src={GitHub} alt="GitHub" />
        </a>
      </div>
    </FooterContainer>
  );
};
